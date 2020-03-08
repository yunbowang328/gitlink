class GraduationTasksController < ApplicationController
  before_action :require_login, :check_auth, except: [:index]
  before_action :find_course, except: [:edit, :update, :settings, :update_settings, :tasks_list, :show, :show_comment,
                                       :cross_comment_setting, :assign_works, :commit_comment_setting, :sonar]
  before_action :find_task, only: [:edit, :update, :settings, :update_settings, :tasks_list, :show, :show_comment,
                                   :cross_comment_setting, :assign_works, :commit_comment_setting, :sonar]
  before_action :user_course_identity
  before_action :task_publish, only: [:show, :show_comment, :tasks_list, :settings]
  before_action :teacher_allowed, only: [:new, :create, :edit, :update, :set_public,:multi_destroy, :publish_task, :end_task,
                                         :update_settings, :add_to_bank, :cross_comment_setting, :assign_works, :commit_comment_setting]
  before_action :require_id_params, only: [:set_public ,:multi_destroy, :publish_task, :end_task, :add_to_bank]
  before_action :valid_params, only: [:update_settings]
  before_action :allow_cross_comment, only: [:cross_comment_setting, :assign_works, :commit_comment_setting]
  include ExportHelper

  def index
    search = "#{params[:search].to_s.strip.downcase}"
    order = params[:order]
    page = params[:page] ? params[:page].to_i : 1

    default_order = "IF(ISNULL(graduation_tasks.publish_time),0,1), graduation_tasks.publish_time DESC, graduation_tasks.created_at DESC"
    @identity = current_user.course_identity(@course)
    if @identity < Course::STUDENT
      @tasks = @course.graduation_tasks.where("graduation_tasks.name like ?", "%#{search}%")
    else
      @tasks = @course.graduation_tasks.where("graduation_tasks.name like ? and publish_time <= '#{Time.now}'", "%#{search}%")
    end

    if order.present? && order != "all"
      if @course.is_end
        @tasks = @tasks.none
      elsif order.to_i == 4  # 补交
        @tasks = @tasks.where("status > 1 and allow_late = 1 and (late_time is null or late_time > '#{Time.now}')")
      else
        @tasks = @tasks.where(status: order)
      end
    end

    @member = @course.course_members.find_by(user_id: current_user.id, is_active: 1)
    @all_count = @course.graduation_tasks.size
    @published_count = @course.graduation_tasks.where("publish_time <= '#{Time.now}'").size
    @task_count = @tasks.size
    @tasks = @tasks.reorder("#{default_order}").page(page).per(15).includes(:graduation_works)
  end

  # 任务问答
  def show
    @attachments = @task.attachments
    @current_user = current_user
  end

  # 毕设任务列表
  def tasks_list
    # 搜索栏数据
    @current_user = current_user

    # 分页参数
    page = params[:page] || 1
    limit = params[:limit] || 20
    @work = @task.graduation_works.where(user_id: current_user.id)
    @students = @course.students
    @assign_power = @user_course_identity < Course::STUDENT && @task.cross_comment && @task.comment_status == 2
    #end_time @task.allow_late ? @task.late_time : @task.end_time
    # 任务发布的情况下： 是老师身份或者任务已截止的情况下公开任务了作品设置的学生也能查看其他人的作品
    if @task.published? && (@user_course_identity < Course::STUDENT ||
        (@user_course_identity == Course::STUDENT && @work.present? && @work.take.work_status > 0 &&
            ((!@task.allow_late && @task.status > 1) || (@task.allow_late && @task.late_time && @task.late_time < Time.now)) &&
            (@task.open_work || @task.open_score)))

      _tasks_list

      # 排序
      rorder = params[:order].blank? ? "update_time" : params[:order]
      b_order = params[:b_order].blank? ? "desc" : params[:b_order]
      if rorder == "update_time" || rorder == "work_score"
        @work_list = @work_list.order("graduation_works.#{rorder} #{b_order}")
      elsif rorder == "student_id"
        @work_list = @work_list.joins(user: :user_extension).order("user_extensions.#{rorder} #{b_order}")
      end

      @view_work = @task.open_work || @user_course_identity < Course::STUDENT

      @work_count = @work_list.count
      @work_excel = @work_list
      @work_list = @work_list.page(page).per(limit)

      if params[:format] == "xlsx"
        complete_works = @work_excel.where("work_status > 0").size
        if @user_course_identity >= Course::STUDENT
          tip_exception(403, "无权限操作")
        elsif complete_works == 0
          normal_status(-1,"暂无用户提交")
        elsif params[:export].present? && params[:export]
          normal_status(0,"正在下载中")
        else
          respond_to do |format|
            format.xlsx{
              set_export_cookies
              graduation_work_to_xlsx(@work_excel,@task,current_user)
              task_export_name_ = "#{current_user.real_name}_#{@course.name}_#{@task.name}_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
              render xlsx: "#{task_export_name_.strip}",template: "graduation_tasks/tasks_list.xlsx.axlsx",locals: {table_columns:@head_cells_column, task_users:@task_cells_column}
            }
          end
        end
      elsif params[:format] == "zip"
        if @user_course_identity >= Course::STUDENT
          tip_exception(403, "无权限操作")
        else
          zip_works = @work_excel.where("work_status > 0")
          status = checkfileSize(zip_works)
          if status == 0
            if params[:export].present? && params[:export]
            normal_status(0,"正在下载中")
            else
              respond_to do |format|
                format.zip{
                  set_export_cookies
                  zipfile = zip_homework_common @task, zip_works
                  file = decode64(zipfile[0][:base64file])
                  send_file "#{OUTPUT_FOLDER}/#{file}", filename: filename_for_content_disposition(file), type: 'application/zip'
                }
              end
            end
          else
            normal_status(status,status == -2 ? "500M" : "无附件可下载")
          end
        end
      end
    else
      @work_list = !@task.published? ? [] : @work
      @view_work = false
      @work_count = @work_list.count
      @all_work_count = @work_list.count
      if params[:format] == "xlsx" || params[:format] == "zip"
        normal_status(-1,"毕设任务未发布")
      end
    end
  end


  # 评论列表接口、 包含一级和二级评论的获取
  def show_comment
    @page = params[:page] || 1
    @limit = params[:limit] || 10
    @parent = params[:parent_id]
    @current_user = current_user

    @messages = @task.journals_for_messages
    @messages_count = @messages.count
    if @parent
      @messages = @messages.where(m_parent_id: @parent).order("created_on asc")
    else
      @messages = @messages.parent_comment.order("created_on desc")
    end

    @messages = @messages.page(@page).per(@limit)
  end

  def create
    ActiveRecord::Base.transaction do
      begin
        @graduation_task = GraduationTask.new(graduation_task_params)
        @graduation_task.course_id = @course.id
        @graduation_task.user_id = current_user.id
        @graduation_task.base_on_project = @graduation_task.task_type == 2 ? 1 : 0
        if @graduation_task.save!
          # 为学生创建作品
          @graduation_task.create_work_list

          Attachment.associate_container(params[:attachment_ids], @graduation_task.id, @graduation_task.class) if params[:attachment_ids]
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def new
    left_banner_content = @course.course_modules.search_by_module_type("graduation")
    if left_banner_content.present?
      banner = left_banner_content.first.course_second_categories.last
      @left_banner_id = banner.id
      @left_banner_name = banner.name
    else
      normal_status(-1,"左侧导航不存在！")
    end
  end

  def edit
    left_banner_content = @course.course_modules.search_by_module_type("graduation")
    if left_banner_content.present?
      banner = left_banner_content.first.course_second_categories.last
      @left_banner_id = banner.id
      @left_banner_name = banner.name
    end
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @task.update_attributes(graduation_task_params)
        Attachment.associate_container(params[:attachment_ids], @task.id, @task.class) if params[:attachment_ids]
        normal_status(0, "更新成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 代码检测
  def sonar
    tip_exception(403, "无权限访问") unless current_user.admin_or_business?

    _tasks_list
    @work_list = @work_list.where("work_status > 0")

    person_list = @work_list.map do |work|
      o = {
        name: "#{work.user&.real_name}",
        uid: "#{work.user&.student_id}",
        downloadUrl: ''
      }
      attachment = work.attachments.last
      if attachment
        o[:downloadUrl] = "#{edu_setting('host_name')}"+download_url(attachment)
      end

      o
    end
    filename = "#{@task.name}_#{Time.now.strftime('%Y%m%d%H%M%S')}.json"
    json = File.open("/tmp/#{filename}", "w+")
    json.puts(person_list.to_json)
    json.close

    send_file json.path, filename: filename
  end

  # 设为公开
  def set_public
    tip_exception("仅公开课堂才能公开毕设任务") if @course.is_public == 0
    tasks = @course.graduation_tasks.where(id: params[:task_ids])
    tasks.update_all(is_public: 1)
    normal_status(0, "更新成功")
  end

  # 删除多个任务
  def multi_destroy
    ActiveRecord::Base.transaction do
      begin
        tasks = @course.graduation_tasks.where(id: params[:task_ids])

        tasks.destroy_all

        # 这些写是因为model中的关联删除无法删除is_delete=0的作品
        GraduationWork.where(graduation_work_id: tasks.pluck(:id)).destroy_all
        normal_status(0, "删除成功")

      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 加入题库
  def add_to_bank
    ActiveRecord::Base.transaction do
      begin
        tasks = @course.graduation_tasks.where(id: params[:task_ids])

        tasks.each do |task|
          task_bank = current_user.gtask_banks.find_by(graduation_task_id: task.id)

          # 已加入的更新，未加入的新建
          if task_bank.present?
            task_bank.update_attributes(name: task.name, description: task.description, course_list_id: @course.course_list_id,
                                        min_num: task.min_num, max_num: task.max_num, base_on_project: task.base_on_project)
            task_bank.attachments.destroy_all
          else
            task_bank = GtaskBank.new(name: task.name, description: task.description, user_id: current_user.id,
                                              task_type: task.task_type, quotes: 1, graduation_task_id: task.id,
                                              min_num: task.min_num, max_num: task.max_num, base_on_project: task.base_on_project,
                                              course_list_id: @course.course_list_id)

            task_bank.save!
            task.update_attributes!(gtask_bank_id: task_bank.id)
          end
          task.attachments.each do |attachment|
            att = attachment.copy
            att.author_id = task_bank.user_id
            att.copy_from = attachment.id
            task_bank.attachments << att
          end
        end

        normal_status(0,"加入题库成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def publish_task
    tip_exception("缺少截止时间参数") if params[:end_time].blank?
    tip_exception("截止时间必须晚于当前时间") if params[:end_time] <= strf_time(Time.now)
    tip_exception("截止时间不能晚于课堂结束时间（#{@course.end_date.end_of_day.strftime("%Y-%m-%d %H:%M")}）") if
      @course.end_date.present? && params[:end_time] > strf_time(@course.end_date.end_of_day)

    # ActiveRecord::Base.transaction do
      begin
        tasks = @course.graduation_tasks.where(id: params[:task_ids], status: 0).
            where("publish_time is null or publish_time > '#{Time.now}'")

        tasks.each do |task|
          task.publish_time = Time.now
          task.status = 1

          task.end_time = params[:end_time]

          # 补交结束时间
          task.late_time = Time.at(task.end_time.to_i + 30*24*3600) if task.allow_late && task.late_time.nil?

          task.save!
          GraduationTaskPublishNotifyJob.perform_later(task.id)
          task.act_as_course_activity
        end
        normal_status(0, "发布成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    # end
  end

  def end_task
    ActiveRecord::Base.transaction do
      begin
        tasks = @course.graduation_tasks.where(id: params[:task_ids], status: 1)

        tasks.each do |task|
          task.end_time = Time.now
          task.status = 2
          task.save!
        end
        normal_status(0, "更新成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def settings
    @current_user = current_user
  end

  def update_settings
    ActiveRecord::Base.transaction do
      begin
        unless @course.is_end

          # 分组设置  已有提交作品或关联项目的，则“基于项目实施”不能修改, 已有提交作品的人数限制的范围只能扩大，不能缩小
          if @task.task_type == 2
            @task.min_num = @task.student_commit_works ? (params[:min_num].to_i > @task.min_num ? @task.min_num : params[:min_num])
                                : params[:min_num]
            @task.max_num = @task.student_commit_works ? (params[:max_num].to_i < @task.max_num ? @task.max_num : params[:max_num])
                                : params[:max_num]
            unless @task.student_relate_projects
              tip_exception("base_on_project参数不能为空") if params[:base_on_project].blank?
              @task.base_on_project = params[:base_on_project].to_i
            end
          end

          # 发布设置
          if @task.status == 0
            tip_exception("发布时间不能为空") if params[:publish_time].blank?
            tip_exception("截止时间不能为空") if params[:end_time].blank?
            tip_exception("发布时间不能早于当前时间") if params[:publish_time].to_time <= Time.now
            tip_exception("截止时间不能早于当前时间") if params[:end_time].to_time <= Time.now
            tip_exception("截止时间必须晚于发布时间") if params[:publish_time].to_time >= params[:end_time].to_time
            tip_exception("截止时间不能晚于课堂结束时间（#{@course.end_date.end_of_day.strftime("%Y-%m-%d %H:%M")}）") if
              @course.end_date.present? && params[:end_time].to_time > @course.end_date.end_of_day

            @task.publish_time = params[:publish_time]
            @task.end_time = params[:end_time]
            if @task.publish_time <= Time.now
              @task.status = 1
              send_tiding = true
            end

          elsif @task.status < 2
            tip_exception("截止时间不能为空") if params[:end_time].blank?
            tip_exception("截止时间不能早于当前时间") if params[:end_time] <= Time.now.strftime("%Y-%m-%d %H:%M:%S")
            tip_exception("截止时间不能晚于课堂结束时间（#{@course.end_date.end_of_day.strftime("%Y-%m-%d %H:%M")}）") if
              @course.end_date.present? && params[:end_time] > strf_time(@course.end_date.end_of_day)
            @task.end_time = params[:end_time]
          end

          # 补交设置
          # @task.allow_late = params[:allow_late]
          # @task.late_penalty = params[:allow_late].to_i == 1 ? params[:late_penalty] : 0
          current_late_penalty = @task.late_penalty
          if params[:allow_late].to_i == 1
            tip_exception("补交结束时间不能为空") if params[:late_time].blank?
            tip_exception("补交结束时间不能早于截止时间") if params[:late_time] <= @task.end_time
            tip_exception("补交结束时间不能晚于课堂结束时间（#{@course.end_date.end_of_day.strftime("%Y-%m-%d %H:%M")}）") if
              @course.end_date.present? && params[:late_time] > strf_time(@course.end_date.end_of_day)
            tip_exception("迟交扣分应为正整数") if params[:late_penalty] && params[:late_penalty].to_i < 0

            @task.allow_late = true
            @task.late_time = params[:late_time]
            @task.late_penalty = params[:late_penalty].to_i
          else
            @task.allow_late = false
            @task.late_penalty = 0
          end

          # 迟交扣分有变动则更新迟交学生的成绩
          if @task.late_penalty != current_late_penalty
            @task.graduation_works.where(work_status: 2).each do |work|
              work.late_penalty = @task.late_penalty
              work.save!
            end
          end

          # 评分设置
          unless @task.cross_comment && @task.comment_time && @task.comment_time < Time.now
            @task.cross_comment = params[:cross_comment].to_i

            tip_exception("评阅时间不能为空") if @task.cross_comment && params[:comment_time].blank?
            tip_exception("评阅时间应当大于截止时间") if @task.cross_comment && params[:comment_time] <= @task.end_time

            @task.comment_time = @task.cross_comment ? params[:comment_time] : nil

            @task.comment_status = 2 if @task.cross_comment && @task.comment_status == 0

            @task.graduation_work_comment_assignations.destroy_all if !@task.cross_comment
            # 去掉评阅设置
            # @task.comment_num = @task.cross_comment ? params[:comment_num].to_i : 3
            # @task.comment_status = @task.cross_comment ? params[:comment_status] : 0
            # if @task.cross_comment && params[:comment_status].to_i == 4
            #   tip_exception("评阅数不能为空") if params[:comment_num].blank?
            #   tip_exception("评阅数应大于0") if params[:comment_num].to_i < 1
            #
            #   @course.graduation_groups.each_with_index do |group, index|
            #     ass_group = @task.graduation_task_group_assignations.find_by(graduation_group_id: group.id)
            #     if ass_group.present? && params[:comment_group][index].present? && params[:comment_group][index] != "0"
            #       ass_group.update_attributes(assign_graduation_group_id: params[:comment_group][index])
            #     else
            #       @task.graduation_task_group_assignations << GraduationTaskGroupAssignation.new(graduation_group_id: group.id,
            #                                                                                      assign_graduation_group_id: params[:comment_group][index])
            #     end
            #   end
            # end
          end

          # 公开设置
          @task.open_work = params[:open_work] ? params[:open_work].to_i : 0
          @task.open_score = params[:open_score] ? params[:open_score].to_i : 0
          @task.save!

          if send_tiding
            GraduationTaskPublishNotifyJob.perform_later(@task.id)
            @task.act_as_course_activity
          end

          normal_status(0, "更新成功")
        else
          tip_exception("课堂已结束不能再更新")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def cross_comment_setting
    @comment_status = params[:comment_status] || (@task.cross_comment ? @task.comment_status : 2)
    group_ids = @course.charge_group_ids(current_user)
    @course_groups = @course.course_groups.where(id: group_ids)

    # 如果传了分班id则取合集
    group_ids = group_ids & params[:group_ids].map(&:to_i) unless params[:group_ids].blank?
    page = params[:page] ? params[:page].to_i : 1
    limit = params[:limit] ? params[:limit].to_i : 10

    # 取所有课堂的作品
    if group_ids.sort == @course.course_groups.pluck(:id).sort
      @work_list = @task.graduation_works
    else
      @work_list = @task.graduation_works.joins("join course_members on graduation_works.user_id=course_members.user_id").
        where(course_members: {course_group_id: group_ids})
    end
    @user_count = @work_list.size
    @work_list = @work_list.page(page).per(limit).includes(user: [:user_extension])
    @students = @course.students.where(user_id: @work_list.pluck(:user_id))
  end

  def assign_works
    tip_exception("请先选择作品") if params[:work_ids].blank?
    tip_exception("请指定要分配的老师或答辩组") if params[:user_ids].blank? && params[:graduation_group_ids].blank?

    ActiveRecord::Base.transaction do
      begin
        works = @task.graduation_works.where(id: params[:work_ids])
        # 手动分配：分配给老师
        if !params[:user_ids].blank?
          @task.update_attributes(comment_status: 2)
          works.each do |work|
            # 之前分配的老师但现在未分配时需要删除
            work.graduation_work_comment_assignations.where.not(user_id: params[:user_ids]).destroy_all
            @course.teachers.where(user_id: params[:user_ids]).pluck(:user_id).uniq.each do |user_id|
              unless work.graduation_work_comment_assignations.exists?(user_id: user_id)
                GraduationWorkCommentAssignation.create!(graduation_task_id: @task.id, graduation_work_id: work.id,
                                                     user_id: user_id)
              end
            end
          end

          # 答辩组分配：分配答辩组
        elsif !params[:graduation_group_ids].blank?
          @task.update_attributes(comment_status: 4)
          works.each do |work|
            work.graduation_task_group_assignations.where.not(graduation_group_id: params[:graduation_group_ids]).destroy_all
            @course.graduation_groups.where(id: params[:graduation_group_ids]).pluck(:id).uniq.each do |graduation_group_id|
              unless work.graduation_task_group_assignations.exists?(graduation_group_id: graduation_group_id)
                GraduationTaskGroupAssignation.create!(graduation_task_id: @task.id, graduation_work_id: work.id,
                                                   graduation_group_id: graduation_group_id)
              end
            end
          end
        end
        normal_status("分配成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def commit_comment_setting
    tip_exception("type参数有误") if params[:type].blank? || !["commit", "cancel"].include?(params[:type])
    ActiveRecord::Base.transaction do
      begin
        # 提交弹框
        # if params[:type] == "commit"
        #   tip_exception("comment_status参数有误") if params[:comment_status].blank? || ![2, 4].include?(params[:comment_status].to_i)
        #   @task.update_attributes(comment_status: params[:comment_status])
        #   if params[:comment_status].to_i == 2
        #     @task.temporary_graduation_work_comment_assignations.update_all(temporary: 0) # 临时数据转正
        #     @task.delete_graduation_work_comment_assignations.destroy_all # 删除置了删除位的数据
        #     @task.graduation_task_group_assignations.destroy_all # 删除答辩组分配数据
        #   else
        #     @task.temporary_graduation_task_group_assignations.update_all(temporary: 0)
        #     @task.delete_graduation_task_group_assignations.destroy_all
        #     @task.graduation_work_comment_assignations.destroy_all
        #
        #     GraduationTaskCrossCommentJob.perform_later(@task.id)
        #   end
        # else
        #   # 取消时删除临时数据，恢复删除位数据
        #   @task.temporary_graduation_work_comment_assignations.destroy_all # 删除临时数据
        #   @task.delete_graduation_work_comment_assignations.update_all(temporary: 0) # 恢复置了删除位的数据
        #
        #   @task.temporary_graduation_task_group_assignations.destroy_all # 删除临时数据
        #   @task.delete_graduation_task_group_assignations.update_all(temporary: 0) # 恢复置了删除位的数据
        # end
        normal_status("操作成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  private
  def find_task
    begin
      @task = GraduationTask.find(params[:id])
      @course = @task.course
    rescue Exception => e
      uid_logger(e.message)
      tip_exception("id不存在")
    end
  end

  # 未发布时非老师角色不能访问，发布后非课堂成员不能访问未公开的任务
  def task_publish
    if (@user_course_identity >= Course::STUDENT && @task.status < 1) ||
        (@user_course_identity > Course::STUDENT && (@course.is_public == 0 || !@task.is_public))
      tip_exception(-1,"任务还未发布，无法查看")
    end
  end

  def graduation_task_params
    tip_exception("类型参数不能为空") if params[:task_type].blank?
    tip_exception("名称不能为空") if params[:name].blank?
    tip_exception("名称不能超过60个字符") if params[:name].length > 60   #6.11 -hs
    tip_exception("描述不能为空") if params[:description].blank?
    params.require(:graduation_task).permit(:task_type, :name, :description)
  end

  def require_id_params
    tip_exception("请至少选择一个毕设任务") if params[:task_ids].blank?
    tip_exception("批量设置不能超过15个") if params[:task_ids].length > 15
  end

  def valid_params
    if @task.task_type == 2
      tip_exception("最小人数不能为空") if params[:min_num].blank?
      tip_exception("最大人数不能为空") if params[:max_num].blank?
      tip_exception("最小人数不能少于1") if params[:min_num].to_i <= 0
      tip_exception("最大人数不能小于最小人数要求") if params[:min_num].to_i > params[:max_num].to_i
    end
  end

  def allow_cross_comment
    tip_exception("请先开启交叉评阅再设置") unless @task.cross_comment
  end

  def _tasks_list
    # 如有有分班则看分班内的学生，否则看所有学生的作品
    user_ids =
      if @user_course_identity < Course::STUDENT
        @course.teacher_group_user_ids(current_user.id)
      else
        course_group_id = @course.course_member(current_user.id).course_group_id
        @course.students.where(course_group_id: course_group_id).pluck(:user_id)
      end

    @work_list = @task.graduation_works.where(user_id: user_ids).includes(user: [:user_extension])
    @all_work_count = @work_list.count
    @teachers = @course.teachers.where.not(user_id: current_user.id).includes(:user)
    # 教师评阅搜索 0: 未评， 1 已评
    unless params[:teacher_comment].blank?
      graduation_work_ids = GraduationWorkScore.where(graduation_work_id: @work_list.map(&:id)).pluck(:graduation_work_id)
      if params[:teacher_comment].to_i == 0
        @work_list = @work_list.where("work_status != 0")
      elsif params[:teacher_comment].to_i == 1
        @work_list = @work_list.where("work_status != 0").where(id: graduation_work_ids)
      end
    end

    # 作品状态 0： 未提交， 1 按时提交， 2 延迟提交
    unless params[:task_status].blank?
      @work_list = @work_list.where(work_status: params[:task_status])
    end

    # 分班情况
    unless params[:course_group].blank?
      group_user_ids = @course.students.where(course_group_id: params[:course_group]).pluck(:user_id)
      # 有分组只可能是老师身份查看列表
      @work_list = @work_list.where(user_id: group_user_ids)
    end

    # 只看我的交叉评阅
    unless params[:cross_comment].blank?
      graduation_work_id = @task.graduation_work_comment_assignations.where(:user_id =>current_user.id)
                             .pluck(:graduation_work_id).uniq if @task.graduation_work_comment_assignations
      @work_list = @task.graduation_works.where(id: graduation_work_id)
    end

    # 组员、组长作品的筛选
    if @task.task_type == 2 && !params[:member_work].blank?
      if params[:member_work].to_i == 1
        @work_list = @work_list.where("user_id = commit_user_id")
      elsif params[:member_work].to_i == 0
        @work_list = @work_list.where("user_id != commit_user_id")
      end
    end

    # 输入姓名和学号搜索
    # TODO user_extension 如果修改 请调整
    unless params[:search].blank?
      @work_list = @work_list.joins(user: :user_extension).where("concat(lastname, firstname) like ?
                         or student_id like ?", "%#{params[:search]}%", "%#{params[:search]}%")
    end
  end

  #
  # def graduation_work_to_xls items
  #   xls_report = StringIO.new
  #   book = Spreadsheet::Workbook.new
  #   sheet1 = book.create_worksheet :name => "学生成绩"
  #   blue = Spreadsheet::Format.new :color => :blue, :weight => :bold, :size => 10
  #   sheet1.row(0).default_format = blue
  #   course = @task.course
  #   count_row = 1
  #   list = 0
  #   if @task.task_type == 1
  #     if @task.cross_comment
  #       sheet1.row(0).concat(["学生id","真实姓名", "登录名", "学号", "电子邮箱", "分班", "作品描述", "教师评分","交叉评分", "迟交扣分",
  #                             "成绩", "更新时间"])
  #     else
  #       sheet1.row(0).concat(["学生id", "真实姓名", "登录名", "学号", "电子邮箱",  "分班", "作品描述", "教师评分", "迟交扣分",
  #                             "成绩", "更新时间"])
  #     end
  #     items.each do |work|
  #       sheet1[count_row,list] = work.user.id
  #       sheet1[count_row,list+=1] = work.user.full_name
  #       sheet1[count_row,list+=1] = work.user.login
  #       sheet1[count_row,list+=1] = work.user.student_id
  #       sheet1[count_row,list+=1] = work.user.mail
  #       sheet1[count_row,list+=1] = work.class_grouping_name
  #       sheet1[count_row,list+=1] = strip_html work.description if work.description
  #       sheet1[count_row,list+=1] = work.teacher_score.nil? ? "未评分" : work.teacher_score.round(1)
  #       if @task.cross_comment
  #         sheet1[count_row,list+=1] = work.cross_score.nil? ? "未评分" : work.cross_score.round(1)
  #       end
  #       sheet1[count_row,list+=1] = work.late_penalty
  #       sheet1[count_row,list+=1] =  work.respond_to?("work_score") ? work.work_score.nil? ? "未评分" : work.work_score.round(1) : "未评分"
  #       sheet1[count_row,list+=1] = format_time(work.update_time)
  #       count_row += 1
  #       list = 0
  #     end
  #   elsif @task.task_type == 2
  #     if @task.cross_comment
  #       sheet1.row(0).concat(["分组", "组员","分班", "作品描述", "教师评分","交叉评分","迟交扣分", "成绩", "更新时间"])
  #     else
  #       sheet1.row(0).concat(["分组", "组员","分班", "作品描述", "教师评分", "迟交扣分", "成绩", "更新时间"])
  #     end
  #     items.each do |work|
  #       sheet1[count_row,list] = work.group_id
  #       sheet1[count_row,list+=1] = work.user.full_name
  #       sheet1[count_row,list+=1] = work.class_grouping_name
  #       sheet1[count_row,list+=1] = strip_html work.description if work.description
  #       sheet1[count_row,list+=1] = work.teacher_score.nil? ? "未评分" : work.teacher_score.round(1)
  #       if @task.cross_comment
  #         sheet1[count_row,list+=1] = work.cross_score.nil? ? "未评分" : work.cross_score.round(1)
  #       end
  #       sheet1[count_row,list+=1] = work.late_penalty
  #       sheet1[count_row,list+=1] = work.respond_to?("work_score") ? work.work_score.nil? ? "未评分" : work.work_score.round(1) : "未评分"
  #       sheet1[count_row,list+=1] = format_time(work.update_time)
  #       count_row += 1
  #       list = 0
  #     end
  #   end
  #   book.write xls_report
  #   xls_report.string
  # end

end
