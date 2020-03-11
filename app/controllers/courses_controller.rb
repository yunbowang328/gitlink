class CoursesController < ApplicationController
  include MessagesHelper
  include CustomSortable

  # model validation error
  rescue_from ActiveRecord::RecordInvalid do |ex|
    render_error(ex.record.errors.full_messages.join(','))
  end
  # form validation error
  rescue_from ActiveModel::ValidationError do |ex|
    render_error(ex.model.errors.full_messages.join(','))
  end

  before_action :require_login, except: [:index, :show, :students, :teachers, :board_list, :mine, :all_course_groups,
                                         :left_banner, :top_banner, :informs, :online_learning, :course_groups, :search_slim]
  before_action :check_account, only: [:new, :create, :apply_to_join_course, :join_excellent_course]
  before_action :check_auth, except: [:index, :show, :students, :teachers, :board_list, :mine, :all_course_groups,
                                                      :left_banner, :top_banner, :apply_to_join_course, :exit_course, :course_groups]
  before_action :set_course, only: [:show, :update, :destroy, :settings, :set_invite_code_halt,
                                    :set_public_or_private, :search_teacher_candidate, :teachers, :apply_teachers,
                                     :top_banner, :left_banner, :add_teacher_popup, :add_teacher, :inform_up, :inform_down,
                                     :graduation_group_list, :create_graduation_group, :join_graduation_group,
                                     :course_group_list, :set_course_group, :change_course_admin, :change_course_teacher,
                                     :delete_course_teacher, :teacher_application_review, :students, :all_course_groups,
                                     :transfer_to_course_group, :delete_from_course, :search_users, :add_students_by_search,
                                     :base_info, :get_historical_courses, :create_group_by_importing_file, :course_videos,
                                     :attahcment_category_list,:export_member_scores_excel, :duplicate_course, :delete_course_video,
                                     :switch_to_teacher, :switch_to_assistant, :switch_to_student, :exit_course,
                                     :informs, :update_informs, :online_learning, :update_task_position, :tasks_list,
                                    :join_excellent_course, :export_couser_info, :export_member_act_score, :new_informs,
                                    :delete_informs, :change_member_role, :course_groups, :join_course_group, :statistics,
                                    :work_score, :act_score, :calculate_all_shixun_scores]
  before_action :user_course_identity, except: [:join_excellent_course, :index, :create, :new, :apply_to_join_course,
                                                :search_course_list, :get_historical_course_students, :mine, :search_slim, :board_list]
  before_action :teacher_allowed, only: [:update, :destroy, :settings, :search_teacher_candidate,
                                         :transfer_to_course_group, :delete_from_course, :export_member_scores_excel,
                                         :search_users, :add_students_by_search, :get_historical_courses, :add_teacher_popup,
                                         :add_teacher, :export_couser_info, :export_member_act_score,
                                         :update_informs, :new_informs, :delete_informs, :switch_to_student]
  before_action :admin_allowed, only: [:set_invite_code_halt, :set_public_or_private, :change_course_admin,
                                       :set_course_group, :create_group_by_importing_file,
                                       :update_task_position, :tasks_list]
  before_action :teacher_or_admin_allowed, only: [:graduation_group_list, :create_graduation_group, :join_graduation_group,
                                                  :change_course_teacher, :course_group_list, :change_member_role,:inform_up, :inform_down,
                                                  :teacher_application_review, :apply_teachers, :delete_course_teacher]
  before_action :validate_course_name, only: [:create, :update]
  before_action :find_board, only: :board_list
  before_action :validate_page_size, only: :mine
  before_action :course_tasks, only: [:tasks_list, :update_task_position]
  before_action :validate_inform_params, only: [:update_informs, :new_informs]
  before_action :course_member_allowed, only: [:statistics, :work_score, :act_score, :calculate_all_shixun_scores]

  if RUBY_PLATFORM =~ /linux/
    require 'simple_xlsx_reader'
    require 'roo-xls'
  end

  # GET /courses
  # GET /courses.json
  def index
    @user = current_user
    # 根据分类查询课堂(全部，我的，最新，最热)
    @order = params[:order].present? ? params[:order] : "all"
    @courses = current_laboratory.all_courses.not_deleted
    if @order == "visits"
      order_str = "courses.id = 1309 DESC, courses.visits DESC"
      @courses = @courses.where(is_hidden: 0)
    else
      order_str = "courses.id = 1309 DESC, courses.homepage_show DESC, courses.created_at desc"
      @courses = @courses.where(is_hidden: 0, is_end: 0)
    end

    # 金课未开课的不显示在首页
    @courses = @courses.where("start_date is null or start_date <= '#{Date.today}'")

    # 根据搜索关键字进一步筛选
    if params[:search].present?
      # REDO:Extension
      #user_ids = User.includes(user_extension: :school).where("schools.name like ?", "%#{params[:search]}%").pluck(:id)
      #course_ids = CourseMember.includes(:user, :course).where("course_members.course_id in (?) and course_members.role in (1,2,3)
      #                                    and CONCAT(users.lastname, users.firstname) like ?", @courses.map(&:id), "%#{params[:search]}%")
      #                                            .pluck(:course_id)
      #@courses = @courses.where("name like ?", "%#{params[:search]}%").or(@courses.where(tea_id: user_ids)).or(@courses.where(id: course_ids))
      # 6:21 daiao
      sql = %Q{
        (course_members.role in(1,2,3) and CONCAT(users.lastname, users.firstname) like :keyword) or courses.name like :keyword
        or schools.name like :keyword
      }
      @courses = @courses.joins(:school, course_members: :user)
                     .where("#{sql}", keyword: "%#{params[:search]}%").distinct
    end
    @courses_count = @courses.count("courses.id")
    @courses = @courses.order(order_str)

    # 分页
    page  = params[:page]  || 1
    limit = params[:limit] || 16

    @courses = @courses.page(page).per(limit)
    @courses = @courses.preload(:school, :none_hidden_course_modules, teacher: :user_extension)
  end

  def course_videos
    logger.info("########[#{@course}")
    videos = @course.videos
    videos = custom_sort(videos, params[:sort_by], params[:sort_direction])
    @count  = videos.count
    @videos = paginate videos
  end

  def delete_course_video
    video = Video.find_by(id: params[:video_id])
    tip_exception(404, "找不到资源") if video.blank?
    tip_exception(403, "...") unless (video.user_id == current_user.id || current_user.admin_or_business?)
    video.destroy!
    AliyunVod::Service.delete_video([video.uuid]) rescue nil
    render_ok
  end

  def visits_plus_one
    new_visits = @course.visits + 1
    @course.update_visits(new_visits)
    normal_status("成功")
  end

  # GET /courses/1
  # GET /courses/1.json
  def show
    # render :json => {first_category_url: module_url(course.course_modules.where.not(module_type: "activity").where(hidden: 0).first, course)}
  end

  # GET /courses/new
  def new
    @course = Course.new
    unless params[:subject_id].blank?
      subject = Subject.find_by(id: params[:subject_id], excellent: 1)
      render :json => {status: 0, course_name: "#{subject&.name}第#{subject&.courses&.count.to_i + 1}期"}
    else
      normal_status("成功")
    end
  end

  # Get /courses/:id/settings
  # Edit Page
  def settings
    @course_modules = @course.course_modules.where.not(module_type: 'activity')
  end

  # POST /courses
  # POST /courses.json
  def create
    begin
      ActiveRecord::Base.transaction do
        @course = Course.new(name: params[:name], class_period: params[:class_period], credit: params[:credit],
                             end_date: params[:end_date], is_public: params[:is_public], school_id: @school.id,
                             authentication: params[:authentication], professional_certification: params[:professional_certification])
        @course.tea_id = current_user.id

        if params[:subject_id].blank?
          @course_list_name = params[:course_list_name].strip
          @course_list = CourseList.find_by(name: @course_list_name)
          if @course_list
            @course.course_list_id = @course_list.id
          else
            new_course_list = CourseList.create!(name: @course_list_name, user_id: current_user.id, is_admin: 0)
            @course.course_list_id = new_course_list.id
          end
        else
          subject = Subject.find_by!(id: params[:subject_id])
          @course.start_date = params[:start_date]
          @course.subject_id = subject.id
          @course.excellent = true
          course_list = CourseList.find_by(name: subject.name) || CourseList.create!(name: subject.name, user_id: current_user.id, is_admin: 0)
          @course.course_list_id = course_list.id
        end

        @course.is_end = @course.end_date.present? && @course.end_date < Date.today

        if @course.save!
          @course.generate_invite_code
          CourseInfo.create!(user_id: current_user.id, course_id: @course.id)
          CourseMember.create!(course_id: @course.id, user_id: current_user.id, role: 1)

          # 将实践课程的教学团队成员以教师身份加入课堂
          if @course.subject
            @course.subject.subject_members.where.not(user_id: current_user.id).each do |s_member|
              CourseMember.create!(course_id: @course.id, user_id: s_member.user_id, role: 2)
            end

            Inform.create(container: @course, description: @subject.learning_notes, name: "学习须知")

            @course.create_stages @course.subject
          end

          course_module_types = params[:course_module_types]
          @course.create_course_modules(course_module_types)
        end
      end
      CreateSubjectCourseStudentJob.perform_later(@course.id) if @course.subject && @course.subject.subject_appointments.count > 0
    rescue => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  # PATCH/PUT /courses/1
  # PATCH/PUT /courses/1.json
  def update
    ActiveRecord::Base.transaction do
      begin
        extra_params = Hash.new
        extra_params[:school_id] = @school.id

        if @course.is_end && (course_params[:end_date].blank? || course_params[:end_date].to_date >= Date.today)
          extra_params[:is_end] = 0
        elsif !@course.is_end && !course_params[:end_date].blank? && course_params[:end_date].to_date < Date.today
          extra_params[:is_end] = 1
        end

        extra_params[:authentication] = params[:authentication]
        extra_params[:professional_certification] = params[:professional_certification]

        if @course.subject
          @course.start_date = params[:start_date]
        else
          extra_params[:is_public] = params[:is_public].present? ? params[:is_public] : 0
          @course_list_name = params[:course_list_name].strip
          @course_list = CourseList.find_by(name: @course_list_name)
          if @course_list
            extra_params[:course_list_id] = @course_list.id
          else
            new_course_list = CourseList.create(name: @course_list_name, user_id: current_user.id, is_admin: 0)
            extra_params[:course_list_id] = new_course_list.id
          end
        end

        @course.update_attributes!(course_params.merge(extra_params))
        @course.update_course_modules(params[:course_module_types])
        Rails.logger.info("###############course_update_end")
        normal_status(0, "成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception("课堂更新失败,原因: #{e.message}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def statistics
    max_exp = User.where(id: @course.students.pluck(:user_id)).pluck(:experience).max
    limit = params[:limit] || 5
    @top_scores = course_statistics(@course, max_exp, limit)
  end

  def work_score
    sort = params[:sort] || "desc"
    group_ids = params[:group_ids].is_a?(Array) ? params[:group_ids] : params[:group_ids].split(",") if params[:group_ids]
    @course_members = course_work_scores @course, sort, group_ids
    if @user_course_identity == Course::STUDENT
      user_ids = @course_members.map(&:user_id)
      @rank = user_ids.index(current_user.id).to_i + 1
      @course_members = @course_members.select{|member| member.user_id == current_user.id}
    else
      @all_count = @course_members.size
      @course_members = paginate @course_members
    end
  end

  def act_score
    group_ids = params[:group_ids].is_a?(Array) ? params[:group_ids] : params[:group_ids].split(",") if params[:group_ids]
    all_members = course_act_scores @course, group_ids
    @course_members = all_members[0 .. 9]
    # if @user_course_identity == Course::STUDENT
    #   user_ids = all_members.map(&:user_id)
    #   rank = user_ids.index(current_user.id).to_i + 1
    #   if rank > 10
    #     current_member = all_members.select{|member| member.user_id == current_user.id}.first
    #     @course_members << current_member if current_member.present?
    #   end
    # end
  end

  def join_excellent_course
    tip_exception("您已是课堂成员") if current_user.member_of_course?(@course)
    tip_exception("请通过邀请码加入课堂") unless @course.excellent
    tip_exception("该课堂已结束") if @course.is_end
    begin
      new_student = CourseMember.new(user_id: current_user.id, course_id: @course.id, role: 4)
      new_student.save!

      CourseAddStudentCreateWorksJob.perform_later(@course.id, [current_user.id])
      StudentJoinCourseNotifyJob.perform_later(current_user.id, @course.id)
      normal_status(0, "加入成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception(e.message)
    end
  end

  def informs
    @informs = @course.informs.order("position desc")
  end

  def inform_up
    inform = @course.informs.find_by(id: params[:inform_id])
    next_inform = inform.next_inform
    ActiveRecord::Base.transaction do
      if next_inform.blank?
        render_error('已经到达最顶部')
      else
        inform.update!(position: (inform.position + 1))
        next_inform.update!(position: inform.position - 1)
        render_ok
      end
    end
  end

  def inform_down
    inform = @course.informs.find_by(id: params[:inform_id])
    last_inform = inform.last_inform
    ActiveRecord::Base.transaction do
      if last_inform.blank?
        render_error('已经到达最底部')
      else
        inform.update!(position: (inform.position - 1))
        last_inform.update!(position: inform.position + 1)
        render_ok
      end
    end

  end

  def new_informs
    inform = Inform.new(container: @course)
    inform.name = params[:name]
    inform.description = params[:description]
    inform.position = @course.informs.maximum(:position).to_i + 1
    inform.save!
    normal_status("创建成功")
  end

  def update_informs
    inform = @course.informs.find_by(id: params[:inform_id])
    inform.update_attributes!(name: params[:name], description: params[:description])
    normal_status("更新成功")
  end

  def delete_informs
    inform = @course.informs.find_by(id: params[:inform_id])
    @course.informs.where("position > ?", inform.position).update_all("position = position - 1")
    inform.destroy!
    normal_status("删除成功")
  end

  def online_learning
    @subject = @course.subject
    @stages = @course.course_stages.includes(:shixuns)
    @user = current_user
    @myshixuns = @user.myshixuns.where(shixun_id: @course.course_stage_shixuns.pluck(:shixun_id))
    @start_learning = @user_course_identity == Course::STUDENT && @myshixuns.present?
  end

  def search_course_list
    search = params[:search] ? "%#{params[:search].strip}%" : "%%"
    @course_lists = CourseList.where("name like ?", "#{search}")
    @search_count = @course_lists.size
  end

  # 邀请码停用/启用
  def set_invite_code_halt
    begin
      @course.update!(invite_code_halt: @course.invite_code_halt == 0 ? 1 : 0)
      normal_status(0, "成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("停用/启用课堂失败")
    end
  end

  # 设置课堂私有/公有
  def set_public_or_private
    begin
      @course.update!(is_public: @course.is_public == 1 ? 0 : 1)
      normal_status(0, "成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("设置课堂公有/私有失败")
    end
  end

  # DELETE /courses/1
  # DELETE /courses/1.json
  def destroy
    if @course.is_delete == 0
      @course.delete!
      Tiding.where(belong_container: @course).update_all(is_delete: 1)
      Tiding.create!(user_id: current_user.id, trigger_user_id: current_user.id, container_id: @course.id,
                     container_type: 'DeleteCourse', tiding_type: 'System', belong_container: @course, extra: @course.name)
      normal_status(0, "成功")
    else
      normal_status(-1, "课堂已删除，无需重复操作")
    end
  end

  # 课堂的基本信息
  def base_info

  end

  # --- 教师列表相关API --- START

  # 教师列表以及教师搜索
  def teachers
    tip_exception(403, "无权限访问") if @course.excellent && @user_course_identity > Course::ASSISTANT_PROFESSOR
    @search_str = params[:search].present? ? params[:search].strip : ""

    if @course.try(:id) != 1309 || current_user.admin_or_business? || current_user.try(:id) == 15582
      @teacher_list = @course.course_members.joins(:user).where("course_members.role in (1, 2, 3)
                                                     and LOWER(concat(users.lastname, users.firstname)) LIKE ?", "%#{@search_str}%")
    else
      @teacher_list = @course.course_members.joins(:user).where("(course_members.role in (1, 3) or (course_members.user_id = #{current_user.id}
                                          and course_members.role = 2)) and LOWER(concat(users.lastname, users.firstname))
                                          LIKE ?", "%#{@search_str}%")
    end

    @teacher_list_size = @teacher_list.size

    @has_graduation_design = @course.course_modules.graduation_module_not_hidden.any?

    sort = params[:sort] || "asc"
    @order = params[:order] ? params[:order].to_i : 1
    if @order.present?
      case @order
      when 1
        @teacher_list = @teacher_list.order("role #{sort}")
      when 2
        @teacher_list = @teacher_list.includes(:user).order("CONVERT(CONCAT(users.lastname, users.firstname) USING gbk) COLLATE gbk_chinese_ci #{sort}")
      when 3
        @teacher_list = @teacher_list.includes(:course, :graduation_group).order("graduation_groups.name #{sort}")
      else
        @teacher_list = @teacher_list.order("role #{sort}")
      end
    else
      @teacher_list = @teacher_list.order("role #{sort}")
    end

    @is_admin = @user_course_identity < Course::PROFESSOR

    @applications_size = CourseMessage.unhandled_join_course_requests_by_course(@course).size

    page = params[:page] || 1
    limit = params[:limit] || 20
    @teacher_list = @teacher_list.page(page).per(limit)
    @teacher_list = @teacher_list.preload(:graduation_group, :user, :teacher_course_groups)
  end

  def apply_teachers
    search_str = params[:search].present? ? params[:search].strip : ""
    @applications = CourseMessage.unhandled_join_course_requests_by_course(@course).
        joins("join users on course_messages.course_message_id=users.id").
        where("LOWER(concat(users.lastname, users.firstname)) LIKE ?", "%#{search_str}%")
    if @course.try(:id) != 1309 || current_user.admin_or_business? || current_user.try(:id) == 15582
      teacher_list = @course.course_members.where("course_members.role in (1, 2, 3)")
    else
      teacher_list = @course.course_members.where("(course_members.role in (1, 3) or (course_members.user_id = #{current_user.id}
                                          and course_members.role = 2))")
    end
    @teacher_list_size = teacher_list.size
    @applications_size = CourseMessage.unhandled_join_course_requests_by_course(@course).size
    @is_admin = @user_course_identity < Course::PROFESSOR
  end

  # 打开添加教师或助教弹窗时访问的接口(需要返回该课堂所有答辩组和所有)
  def add_teacher_popup
    @graduation_groups = @course.graduation_groups
    @course_groups = @course.course_groups
    @school_name = School.find(current_user.school_id).try(:name)
  end

  # 添加教师或助教弹窗中的搜索接口
  def search_teacher_candidate
    name = params[:name]
    school_name = params[:school_name]

    # user_ids_of_course_members = @course.course_members.where(role: [1,2,3]).pluck(:user_id)
    # @users = User.where.not(id: user_ids_of_course_members)

    @users = User.where(status: User::STATUS_ACTIVE)
    @users = @users.where(laboratory_id: current_laboratory.id) unless current_laboratory.main_site?
    @users = @users.where("concat(users.lastname, users.firstname) like '%#{name}%'") if name.present?
    # REDO:Extension
    @users = @users.joins(user_extension: :school).where("schools.name like '%#{school_name}%'") if school_name.present?

    @users_size = @users.size

    page = params[:page] || 1
    limit = params[:limit] || 10
    @users = @users.page(page).per(limit)
  end

  # 添加教师或者助教
  def add_teacher
    ActiveRecord::Base.transaction do
      begin
        @user_list = params[:user_list].present? ? params[:user_list] : []
        return tip_exception("请先选择成员") if @user_list.blank?

        @graduation_group_id = params[:graduation_group_id].present? ? GraduationGroup.find(params[:graduation_group_id]).id : 0

        @course_group_id = params[:course_group_id].present? ? CourseGroup.find(params[:course_group_id]).id : 0

        role = params[:role].to_i

        teacher_ids = []
        @user_list.each do |user|
          active_student_exist = CourseMember.where(user_id: user[:user_id], role: 4, course_id: @course.id, is_active: 1).any?
          is_active = active_student_exist ? 0 : 1
          user_id = User.find(user[:user_id]).id
          existing_teacher = CourseMember.find_by(course_id: @course.id, user_id: user_id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
          if existing_teacher.blank?
            teacher_ids << user_id
            member = CourseMember.create(course_id: @course.id, graduation_group_id: @graduation_group_id, user_id: user_id, role: role, is_active: is_active)

            member.teacher_course_groups << TeacherCourseGroup.new(course_group_id: @course_group_id, user_id: user_id, course_id: @course.id) if @course_group_id != 0
          end
        end
        TeacherInviteJoinCourseNotifyJob.perform_later(current_user.id, @course.id, role, teacher_ids) if teacher_ids.present?
        normal_status(0, "添加成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception(-1, "添加失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 获取当前课堂的所有答辩组
  def graduation_group_list
    @graduation_group_list = @course.graduation_groups
  end

  # 给当前课堂增加答辩组
  def create_graduation_group
    begin
      if params[:name].present?
        identical_exist = GraduationGroup.where(course_id: @course.id, name: params[:name]).any?
        if identical_exist
          normal_status(-1, "已存在同名答辩组")
        else
          GraduationGroup.create(course_id: @course.id, user_id: current_user.id, name: params[:name])
          normal_status(0, "成功")
        end
      else
        tip_exception(-1, "答辩组名称不能为空")
      end
    rescue => e
      uid_logger_error(e.message)
      tip_exception(-1, "添加失败")
      raise ActiveRecord::Rollback
    end
  end

  # 将教师加入答辩组
  def join_graduation_group
    ActiveRecord::Base.transaction do
      begin
        @course_member_list = params[:course_member_list].present? ? params[:course_member_list] : []

        graduation_group_id = GraduationGroup.find(params[:graduation_group_id].to_i).id
        @course_member_list.each do |course_member|
          course_member = CourseMember.find(course_member[:course_member_id].to_i)
          course_member.update!(graduation_group_id: graduation_group_id)
        end
        normal_status(0, "成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception(-1, "加入失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 获取当前课堂的所有分班, 以及当前教师是否对分班具有管理权限的状态
  def course_group_list
    course_member_id = params[:course_member_id]
    user_id = params[:user_id]

    @existed_course_group_ids = TeacherCourseGroup.where(course_id: @course.id, course_member_id: course_member_id, user_id: user_id)
                                                  .pluck(:course_group_id)
    @all_course_groups = CourseGroup.where(course_id: @course.id)
  end

  # 设置教师的管理权限(即设置该教师所能管理的分班)
  def set_course_group
    ActiveRecord::Base.transaction do
      begin
        course_group_ids = params[:course_group_ids]
        user_id = User.find(params[:user_id].to_i).id
        course_member_id = CourseMember.find(params[:course_member_id]).id

        teacher_course_groups = TeacherCourseGroup.where(course_id: @course.id, user_id: user_id, course_member_id: course_member_id)
        teacher_course_groups.destroy_all

        course_group_ids.each do |course_group_id|
          course_group_id = CourseGroup.where(id: course_group_id.to_i, course_id: @course.id).first.id
          TeacherCourseGroup.create(course_id: @course.id, user_id: user_id, course_member_id: course_member_id, course_group_id: course_group_id)
        end
        normal_status(0, "成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception( "分配管理权限失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 变更管理员
  def change_course_admin
    ActiveRecord::Base.transaction do
      begin
        new_admin_user = User.find(params[:user_id].to_i)
        new_admin = CourseMember.find_by!(id: params[:course_member_id].to_i, course_id: @course.id, user_id: new_admin_user.id)
        current_admin = CourseMember.find_by!(course_id: @course.id, role: 1)

        new_admin.CREATOR!
        current_admin.PROFESSOR!

        @course.update_attributes!(tea_id: new_admin_user.id)
        normal_status(0, "变更管理员成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception( "变更管理员失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 修改角色
  def change_member_role
    tip_exception("请至少选择一个角色") if params[:roles].blank?
    tip_exception("不能具有老师、助教两种角色") if params[:roles].include?("PROFESSOR") && params[:roles].include?("ASSISTANT_PROFESSOR")
    tip_exception("管理员不能切换为助教或老师") if params[:user_id].to_i == @course.tea_id &&
      (params[:roles].include?("PROFESSOR") || params[:roles].include?("ASSISTANT_PROFESSOR"))

    course_members = @course.course_members.where(user_id: params[:user_id])
    tip_exception("非课堂成员不能修改角色") if course_members.blank?

    ActiveRecord::Base.transaction do
      # 第一次修改为教师或助教身份时直接创建数据
      if params[:roles].include?("CREATOR")
        teacher_member = course_members.where(role: %i[CREATOR]).take
      elsif (params[:roles].include?("PROFESSOR") || params[:roles].include?("ASSISTANT_PROFESSOR")) && !course_members.exists?(role: %i[PROFESSOR ASSISTANT_PROFESSOR])
        teacher_member = CourseMember.create!(course_id: @course.id, user_id: params[:user_id], role: params[:roles].include?("PROFESSOR") ? 2 : 3)
        # 如果有未审批的申请教师/助教的记录，则修改状态为已审批
        apply_teacher = CourseMessage.where(course_id: @course.id, course_message_id: params[:user_id], status: 0).last
        apply_teacher.update!(status: 1, apply_user_id: current_user.id) if apply_teacher.present?
      elsif course_members.exists?(role: %i[PROFESSOR ASSISTANT_PROFESSOR])
        teacher_member = course_members.where(role: %i[PROFESSOR ASSISTANT_PROFESSOR]).take
        if params[:roles].include?("PROFESSOR") || params[:roles].include?("ASSISTANT_PROFESSOR")
          # 如果之前有老师身份且老师身份要调整时，只需要修改role字段
          if !params[:roles].include?(teacher_member.role) && params[:roles].include?("PROFESSOR")
            teacher_member.PROFESSOR!
          elsif !params[:roles].include?(teacher_member.role) && params[:roles].include?("ASSISTANT_PROFESSOR")
            teacher_member.ASSISTANT_PROFESSOR!
          end
          teacher_member.save!
        else
          # 不含教师的参数时删除记录
          teacher_member.destroy!
          # CourseDeleteStudentNotifyJob.perform_later(@course.id, [teacher_member.user_id], current_user.id)
        end
      end

      # 学生身份的处理
      student_member = course_members.where(role: %i[STUDENT]).take

      # 不存在则创建学生身份
      if params[:roles].include?("STUDENT") && student_member.blank?
        correspond_teacher_exist = CourseMember.exists?(user_id: params[:user_id], is_active: 1, course_id: @course.id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
        new_student = CourseMember.new(user_id: params[:user_id], course_id: @course.id, role: 4)
        new_student.is_active = 0 if correspond_teacher_exist
        new_student.save!

        CourseAddStudentCreateWorksJob.perform_later(@course.id, [params[:user_id]])
        # StudentJoinCourseNotifyJob.perform_later(current_user.id, course.id)
      elsif !params[:roles].include?("STUDENT") && student_member.present?
        # 删除学生身份时激活老师身份
        teacher_member.update_attributes!(is_active: 1) if student_member.is_active && teacher_member.present?
        student_member.destroy!
        CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, [params[:user_id]])
        # CourseDeleteStudentNotifyJob.perform_later(@course.id, [params[:user_id]], current_user.id)
      elsif params[:roles].include?("STUDENT") && student_member.present? && !params[:roles].include?("PROFESSOR") && !params[:roles].include?("ASSISTANT_PROFESSOR")
        # 学生身份存在且学生没有教师身份时更新is_active
        student_member.update_attributes!(is_active: 1)
      end

      normal_status(0, "修改成功")
    end
  end

  # 教师和助教角色转换的接口
  def change_course_teacher
    begin
      course_member = CourseMember.find_by!(id: params[:course_member_id].to_i, course_id: @course.id)
      if course_member.PROFESSOR?
        course_member.ASSISTANT_PROFESSOR!
      elsif course_member.ASSISTANT_PROFESSOR?
        course_member.PROFESSOR!
      else
        tip_exception( "变更教师/助教失败")
      end
      course_member.save!
      normal_status(0, "变更教师/助教成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception( "变更教师/助教失败")
    end
  end

  # 删除教师或助教
  def delete_course_teacher
    begin
      course_member = CourseMember.find_by!(id: params[:course_member_id].to_i, course_id: @course.id)
      tip_exception("删除失败") if course_member.CREATOR? or course_member.STUDENT?

      course_student = CourseMember.find_by(user_id: course_member.user_id, course_id: @course.id, role: %i[STUDENT])
      # Tiding.create!(user_id: course_member.user_id, trigger_user_id: current_user.id, container_id: @course.id,
      #                container_type: 'DeleteCourseMember', tiding_type: 'System', belong_container: @course, extra: @course.name)
      CourseDeleteStudentNotifyJob.perform_later(@course.id, [course_member.user_id], current_user.id)

      course_member.destroy!
      course_student.update!(is_active: 1) if course_student.present? && !course_student.is_active
      normal_status(0, "删除成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("删除失败")
    end
  end

  # 切换为教师
  def switch_to_teacher
    begin
      course_student = @course.students.find_by!(user_id: current_user.id, is_active: 1)
      tip_exception("切换失败") unless course_student.present?

      course_teacher = CourseMember.find_by!(user_id: current_user.id, role: %i[CREATOR PROFESSOR], course_id: @course.id)
      ActiveRecord::Base.transaction do
        course_student.destroy!
        course_teacher.update!(is_active: 1)
        CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, [current_user.id])
      end
      normal_status(0, "切换成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("切换失败")
    end
  end

  # 切换为助教
  def switch_to_assistant
    begin
      course_student = @course.course_members.find_by!(user_id: current_user.id, is_active: 1)
      tip_exception("切换失败") unless course_student.present?

      course_teacher = CourseMember.find_by!(user_id: current_user.id, role: %i[ASSISTANT_PROFESSOR], course_id: @course.id)
      ActiveRecord::Base.transaction do
        course_student.destroy!
        course_teacher.update!(is_active: 1)
        CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, [current_user.id])
      end
      normal_status(0, "切换成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("切换失败")
    end
  end

  # 切换为学生
  def switch_to_student
    ActiveRecord::Base.transaction do
      begin
        course_member = @course.course_members.find_by!(user_id: current_user.id, is_active: 1)
        tip_exception("切换失败") if course_member.STUDENT?

        course_student = CourseMember.find_by(user_id: current_user.id, role: %i[STUDENT], course_id: @course.id)
        course_member.update_attributes!(is_active: 0)
        if course_student
          course_student.update_attributes!(is_active: 1)
        else
          # 学生身份不存在则创建
          CourseMember.create!(user_id: current_user.id, role: 4, course_id: @course.id)
          CourseAddStudentCreateWorksJob.perform_later(@course.id, [current_user.id])
        end
        normal_status(0, "切换成功")
      rescue => e
        uid_logger_error("switch_to_student error: #{e.message}")
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def exit_course
    course_student = CourseMember.find_by!(user_id: current_user.id, role: %i[STUDENT], course_id: @course.id)
    tip_exception("非课堂学生无法退出课堂") unless course_student.STUDENT?
    # 课堂如果还有其他身份的用户则更新is_active
    course_teacher = CourseMember.find_by(user_id: current_user.id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR], course_id: @course.id)
    course_student.destroy!
    course_teacher.update!(is_active: 1) if course_teacher.present? && !course_teacher.is_active
    CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, [current_user.id])
    normal_status(0, "退出成功")
  end

  # 教师申请加入课堂的审批
  def teacher_application_review
    ActiveRecord::Base.transaction do
      begin
        course_message = CourseMessage.find_by!(id: params[:application_id].to_i, course_id: @course.id)
        course_message.apply_user_id = current_user.id
        applier_user = User.find_by!(id: params[:user_id].to_i)

        approval = params[:approval].to_i
        if approval == 1
          course_message.pass!

          content = course_message.content.to_i
          role = (content == 3 || content == 7) ? 3 : ((content == 2 || content == 9) ? 2 : nil)
          if role
            tip_exception("已存在教师/助教身份") if CourseMember.where(course_id: @course.id, user_id: applier_user.id, role: [1, 2 ,3]).any?
          else
            tip_exception("申请角色错误")
          end

          new_teacher = CourseMember.new(course_id: @course.id, user_id: applier_user.id, role: role)
          new_teacher.save!

          # 课堂管理员才有分配权限，且课堂分班数大于0
          if @user_course_identity < Course::PROFESSOR && @course.course_groups_count > 0 && params[:group_id] && params[:group_id].size > 0
            # 分班全选则是不限，不需要做处理
            unless @course.course_groups.where(id: params[:group_id]).size == @course.course_groups_count
              @course.course_groups.where(id: params[:group_id]).each do |group|
                unless TeacherCourseGroup.where(course_id: @course.id, user_id: applier_user.id, course_group_id: group.id, course_member_id: new_teacher.id).exists?
                  TeacherCourseGroup.create(course_id: @course.id, user_id: applier_user.id, course_member_id: new_teacher.id, course_group_id: group.id)
                end
              end
            end
          end
        elsif approval == 2
          course_message.reject!
        else
          tip_exception("参数错误")
        end
        course_message.save!
        normal_status(0, "操作成功")
      rescue => e
        uid_logger_error(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 已通过职业认证的教师复制课堂
  def duplicate_course
    return tip_exception("没有复制权限") unless current_user.admin_or_business? || current_user.is_teacher? || current_user.teacher_of_course?(@course)
    return tip_exception("教师职业认证未通过") unless current_user.pro_certification?

    new_course = @course.self_duplicate
    render json: {new_course_id: new_course.id}
  end
  # --- 教师列表相关API --- END

  # --- 学生列表相关API --- START

  # 学生列表(包括各个子分班的学生列表)及搜索
  def students
    tip_exception(403, "无权限访问") if @course.excellent && @user_course_identity > Course::ASSISTANT_PROFESSOR

    search = params[:search].present? ? params[:search].strip : nil
    order = params[:order].present? ? params[:order].to_i : 1
    sort = params[:sort].present? ? params[:sort] : "asc"
    course_group_id = params[:course_group_id].present? ? params[:course_group_id].to_i : nil

    @students = CourseMember.students(@course)
    if search.present?
      # REDO:Extension
      @students = @students.joins(user: :user_extension).where("LOWER(CONCAT(users.lastname, users.firstname)) like ? or
                                                        user_extensions.student_id like ?", "%#{search}%", "%#{search}%")
    end

    if order == 1
      # REDO:Extension
      @students = @students.includes(user: :user_extension).order("user_extensions.student_id #{sort}, users.login #{sort}")
    elsif order == 2
      @students = @students.includes(:course_group).order("course_groups.position #{sort}, users.login #{sort}")
    else
      # REDO:Extension
      @students = @students.includes(user: :user_extension).order("user_extensions.student_id #{sort}, users.login #{sort}")
    end

    if course_group_id.present?
      @students = @students.where(course_group_id: course_group_id)
      @course_group = CourseGroup.find(course_group_id) if course_group_id != 0
    end

    @students_count = @students.size

    page = params[:page] || 1
    limit = params[:limit] || 20
    @students= @students.page(page).per(limit)
    @students = @students.includes(:course_group, user: :user_extension)
  end

  # 获取当前课程所有分班
  def all_course_groups
    if params[:all]  # 返回所有分班
      @course_groups_array = @course.course_groups.to_a
    else  # 返回权限下的分班
      charge_group_ids = @course.charge_group_ids(current_user)
      @course_groups_array = @course.course_groups.where(id: charge_group_ids).to_a
    end

    current_course_group_id = params[:course_group_id]

    if current_course_group_id.present?
      current_course_group = CourseGroup.find(current_course_group_id)
      @course_groups_array.delete(current_course_group)
    end
  end

  # 分班列表
  def course_groups
    @course_groups = @course.course_groups
    @course_groups = @course_groups.where("name like ?", "%#{params[:search]}%") unless params[:search].blank?
    @all_group_count = @course_groups.size
    @teachers = @course.teachers.includes(:user, :teacher_course_groups) if @user_course_identity < Course::NORMAL
    @current_group_id = @course.students.where(user_id: current_user.id).take&.course_group_id if @user_course_identity == Course::STUDENT
  end

  # 学生自动加入分班
  def join_course_group
    tip_exception("学生才能加入分班") if @user_course_identity != Course::STUDENT
    course_group = CourseGroup.find_by!(id: params[:course_group_id], course_id: @course.id)
    member = CourseMember.find_by!(user_id: current_user.id, course_id: @course.id, role: 4)
    if course_group && member
      member.update_attributes!(course_group_id: course_group.id)
      normal_status(0, "加入成功")
    end
  end

  # 将学生批量移动到某个分班
  def transfer_to_course_group
    ActiveRecord::Base.transaction do
      begin
        course_group_id = params[:course_group_id].to_i

        # course_group_id为0意味着移动学生到未分班
        if course_group_id != 0
          course_group = CourseGroup.find_by!(id: course_group_id, course_id: @course.id)
          course_group_id = course_group.id
        end

        @course.students.where(id: params[:students].pluck(:course_member_id)).each do |student|
          student.update_attributes!(course_group_id: course_group_id)
        end
        normal_status(0, "操作成功")
      rescue => e
        uid_logger(e.message)
        tip_exception("操作失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 从当前课堂删除学生
  def delete_from_course
    ActiveRecord::Base.transaction do
      begin
        students = params[:students]
        student_ids = []

        students.each do |student|
          course_member = CourseMember.find_by(id: student[:course_member_id].to_i, course_id: @course.id)
          if course_member.present?
            member_teacher = CourseMember.find_by(user_id: course_member.user_id, course_id: @course.id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
            student_ids << course_member.user_id
            course_member.destroy!
            member_teacher.update!(is_active: 1) if member_teacher.present?
          end
        end
        CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, student_ids) if student_ids.present?
        CourseDeleteStudentNotifyJob.perform_later(@course.id, student_ids, current_user.id) if student_ids.present?
        normal_status(0, "操作成功")
      rescue => e
        uid_logger(e.message)
        tip_exception("操作失败")
        raise ActiveRecord::Rollback
      end
    end
  end

  # 搜索添加学生
  def add_students_by_search
    student_ids = []
    ActiveRecord::Base.transaction do
      user_ids = params[:user_ids]
      course_group_id = params[:course_group_id].to_i
      if course_group_id != 0
        course_group = CourseGroup.find(course_group_id)
        course_group_id = course_group.id
      end

      user_ids.each do |user_id|
        existing_course_member = @course.course_members.find_by(user_id: user_id.to_i)
        new_student = CourseMember.new(user_id: user_id.to_i, course_id: @course.id, course_group_id: course_group_id, role: 4)

        if existing_course_member.present?
          if existing_course_member.STUDENT?
            existing_course_member.update!(course_group_id: course_group_id)
          else
            new_student.is_active = 0 if existing_course_member.is_active
            new_student.save!
            student_ids << user_id
          end
        else
          new_student.save!
          student_ids << user_id
        end
      end
    end

    CourseAddStudentCreateWorksJob.perform_later(@course.id, student_ids) if student_ids.present?
    TeacherInviteJoinCourseNotifyJob.perform_later(current_user.id, @course.id, 10, student_ids) if student_ids.present?
    normal_status(0, "添加成功")
  end

  # 获取历史课堂，即用户管理的所有课堂以及课堂下的分班(去除当前课堂)
  def get_historical_courses
    @courses = Course.where.not(id: @course.id).joins(:course_members).
        where(is_delete: 0, course_members: {user_id: current_user.id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR]}).includes(:course_groups)
    # @courses = Course.includes(:course_groups).where(id: current_user.course_members, is_delete: 0)
  end

  # 根据历史课堂的课堂id和分班id获取所有学生
  def get_historical_course_students
    course_id = params[:course_id]
    course_group_id = params[:course_group_id]

    @students = CourseMember.where(course_id: course_id, role: %i[STUDENT])
    if course_group_id.present?
      @students = @students.where(course_group_id: course_group_id)
    end

    @students = @students.includes(user: [user_extension: :school])
    @students_count = @students.size
  end

  # 导入创建分班
  def create_group_by_importing_file
    attachment_ids = []

    params[:attachment_ids].each do |id|
      attachment = Attachment.find(id.to_i)
      attachment_ids << attachment.id
    end
    associate_result = Attachment.associate_container(attachment_ids, @course.id, @course.class)
    return normal_status("参数错误") unless associate_result

    attachment_ids.each do |attachment_id|
      attachment = Attachment.find attachment_id

      path = attachment.disk_directory
      name = attachment.disk_filename
      if name.split(".").last == "xls"
        begin
          attachment_folder = edu_setting('attachment_folder')
          full_path = "#{attachment_folder}/#{path}/#{name}"
          xls = Roo::Spreadsheet.open(full_path, extension: :xls)
          worksheet = xls.sheet(0)
          rows = worksheet.last_row.to_i   #最后一行数
          if rows < 2
            return normal_status(-1, "请按照模板格式导入")
          else
            group_count = 0
            (2..rows).each do |row|
              name = worksheet.cell(row, 1).to_s

              if @course.course_groups.where(:name => name).blank?
                @course.course_groups << CourseGroup.new(:name => name, :position => @course.course_groups_count + 1)
                group_count += 1
              end
            end
            return normal_status("已导入#{group_count}个分班")
          end
        rescue => e
          uid_logger_error(e.message)
          normal_status(-1, "无法完成导入，原因：文件内容无法读取")
        end
      else
        normal_status(-1, "只支持xls文件的导入")
      end
    end
  end

  # --- 学生列表相关API --- END

  # 根据姓名和单位搜索用户
  def search_users
    name = params[:name]
    school_name = params[:school_name]

    # REDO:Extension
    @users = User.where(status: User::STATUS_ACTIVE)
    @users = @users.where(laboratory_id: current_laboratory.id) unless current_laboratory.main_site?
    @users = @users.where("concat(users.lastname, users.firstname) like '%#{name}%'") if name.present?
    # REDO:Extension
    @users = @users.joins(user_extension: :school).where("schools.name like '%#{school_name}%'") if school_name.present?

    @users_count = @users.size

    limit = params[:limit] || 20
    page = params[:page] || 1
    @users = @users.includes(user_extension: :school).page(page).per(limit)
  end

  # 申请加入课堂
  def apply_to_join_course
    ActiveRecord::Base.transaction do
      begin

        # 邀请码验证
        return normal_status(-1, "邀请码不能为空") if params[:invite_code].blank?
        invite_code = params[:invite_code]
        course = Course.find_by(invite_code: invite_code, is_delete: 0, invite_code_halt: 0, laboratory_id: current_laboratory.id)
        course_group = CourseGroup.find_by(invite_code: invite_code, invite_code_halt: 0)
        if course.blank?
          return normal_status(-1, "邀请码无效") if course_group.blank?

          course = Course.find_by(id: course_group.course_id, is_delete: 0, laboratory_id: current_laboratory.id)
          return normal_status(-1, "邀请码无效") if course.blank?
        end

        return normal_status(-1, "课堂已结束，无法加入") if course.is_end

        # 实名认证和职业认证的身份判断
        return normal_status(-2, "该课堂要求成员完成实名和职业认证") if course.authentication &&
            course.professional_certification && (!current_user.authentication && !current_user.professional_certification)
        return normal_status(-2, "该课堂要求成员完成实名认证") if course.authentication && !current_user.authentication
        return normal_status(-2, "该课堂要求成员完成职业认证") if course.professional_certification && !current_user.professional_certification

        # 身份验证
        if params[:professor].blank? && params[:assistant_professor].blank? && params[:student].blank?
          return normal_status(-1, "请先选择身份")
        end
        if params[:professor].present? && params[:assistant_professor].present?
          return normal_status(-1, "同一课堂不允许申请多个教师身份")
        end

        # 验证是否存在同学号的学生
        # u_extension = current_user.user_extension
        # if params[:student].present? && u_extension.student?
        #   same_student_id_users = UserExtension.where.not(user_id: current_user.id).where(student_id: u_extension.student_id, identity: %i[student], school_id: u_extension.school_id).pluck(:user_id)
        #   tip_exception("该课堂已存在同学号的学生，暂时无法加入，请联系老师") if course.students.exists?(user_id: same_student_id_users)
        # end

        # 创建学生身份
        if params[:student].present? && params[:student].to_i == 1
          existing_student = CourseMember.find_by(course_id: course.id, role: %i[STUDENT], user_id: current_user.id)
          if existing_student.present?
            # 如果在该课堂已经存在学生身份，且邀请码为分班邀请码，则将其直接加入分班
            existing_student.update!(course_group_id: course_group.id) if course_group.present?
            message = "您已是课堂成员"
          else
            correspond_teacher_exist = current_user.none_admin_teacher_of_course? course
            new_student = CourseMember.new(user_id: current_user.id, course_id: course.id, role: 4)
            new_student.is_active = 0 if correspond_teacher_exist

            new_student.course_group_id = course_group.id if course_group.present?
            new_student.save!

            CourseAddStudentCreateWorksJob.perform_later(course.id, [current_user.id])
            StudentJoinCourseNotifyJob.perform_later(current_user.id, course.id)
            student_role = 1
          end
        end

        # 创建教师身份
        if (params[:professor].present? && params[:professor].to_i == 1) || (params[:assistant_professor].present? && params[:assistant_professor].to_i == 1)
          teacher_already_exist = current_user.teacher_of_course_non_active? course
          unless teacher_already_exist
            existing_course_message = CourseMessage.find_by(course_id: course.id, course_message_id: current_user.id,
                                                            course_message_type: "JoinCourseRequest", status: 0)
            if existing_course_message.blank?
              course_message = CourseMessage.new(course_id: course.id, user_id: course.tea_id, status: 0,
                                                 course_message_id: current_user.id, course_message_type: "JoinCourseRequest",
                                                 viewed: false)
              if params[:professor].present? && params[:professor].to_i == 1
                course_message.content = 2
                role = 9
                message = "教师申请已提交，请等待审核"
              else
                course_message.content = 3
                role = 7
                message = "助教申请已提交，请等待审核"
              end

              course_message.save!

              # role = course_message.content == 2 ? '9' : '7' # 7:助教 9:教师
              ApplyTeacherRoleJoinCourseNotifyJob.perform_later(current_user.id, course.id, role)
              # message = "#{course_message.content == 2 ? '教师' : '助教'}申请已提交，请等待审核"
            else
              message = "#{existing_course_message.content == '2' ? '教师' : '助教'}申请已提交，请等待审核"
            end
          else
            message = "您已是课堂成员"
          end
          teacher_role = 1
        end

        if (teacher_role && student_role) || message.to_s == "您已是课堂成员"
          render json: { status: 0, message: message, course_id: course.id}
        elsif student_role.to_i == 1
          render json: { status: 0, message: "加入成功", course_id: course.id}
        else
          normal_status(message)
        end
      rescue => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def top_banner
    @user = current_user
    @switch_student = Course::BUSINESS < @user_course_identity && @user_course_identity < Course::STUDENT
    @is_student = @user_course_identity == Course::STUDENT
    @course.increment!(:visits)
  end

  def left_banner
    @user = current_user
    @is_teacher = @user_course_identity < Course::ASSISTANT_PROFESSOR
    @course_modules = @course.course_modules.where(hidden: 0)
    @hidden_modules = @course.course_modules.where(hidden: 1)
    @second_category_type = ["shixun_homework", "graduation", "attachment", "board", "course_group"]
  end

  def board_list
    begin
      @course = @board.course
      @current_user = current_user
      return normal_status(403, "你没有权限操作") if !@current_user.teacher_of_course?(@course) && !@current_user.course_identity(@current_user) == 4
      @boards = @course.boards
    rescue Exception => e
      uid_logger(e.message)
      tip_exception("获取数据失败")
      raise ActiveRecord::Rollback
    end
  end

  def attahcment_category_list
    @has_course_groups = @course.course_groups.exists?
    @course_modules = @course.attachment_course_modules
  end

  def mine
    @page  = params[:page]  || 1
    @page_size = params[:page_size] || 15

    @courses = Course.by_user(current_user).hidden(false).processing.not_deleted.by_keywords(params[:search]).distinct

    # @total_count = @courses.count
    # offset = 0
    # while offset < @total_count
    #
    #   offset = offset + @page_size.to_i + 1
    #   @courses = @courses.offset(offset)
    # end

    @courses= @courses.page(@page).per(@page_size)
  end

  # 导出课堂信息
  def export_couser_info
    if params[:export].present? && params[:export]
      normal_status(0,"正在下载中")
    else
      set_export_cookies
      course_info_to_xlsx @course
      filename_ = "#{current_user.real_name}_#{@course.name}_课堂信息_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
      render xlsx: "#{format_sheet_name filename_.strip}",template: "courses/export_course_info.xlsx.axlsx",
             locals: {course_info: @course_info}
    end
  end

  # 导出活跃度
  def export_member_act_score
    search = params[:search] ? "#{params[:search].strip}" : ""   #用户名或学生学号id搜索
    group_id = params[:group_id]  #分班的班级id
    @all_members = @course.students
    @all_members = @all_members.where(course_group_id: group_id) unless group_id.blank?
    unless search.blank?
      @all_members = @all_members.joins(user: [:user_extension]).where('concat(users.lastname, users.firstname) like ? or user_extensions.student_id like ?',"%#{search}%","%#{search}%")
    end

    if @all_members.size == 0
      normal_status(-1,"暂无学生数据")
    elsif params[:export].present? && params[:export]
      normal_status(0,"正在下载中")
    else
      set_export_cookies
      @all_members = student_act_score group_id, search
      act_score_to_xlsx(@all_members)
      filename_ = "#{current_user.real_name}_#{@course.name}_活跃度_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
      render xlsx: "#{format_sheet_name filename_.strip}",template: "courses/export_member_act_score.xlsx.axlsx",
             locals: {activity_level:@user_activity_level}
    end
  end

  # 导出学生成绩
  def export_member_scores_excel
    ActiveRecord::Base.transaction do
      begin
        @all_members = @course.students
        search = params[:search] ? "#{params[:search].strip}" : ""   #用户名或学生学号id搜索
        if params[:group_id].present?
          group_ids = params[:group_id].is_a?(String) ? [params[:group_id].to_i] : params[:group_id].map(&:to_i)
          @all_members = @all_members.where(course_group_id: group_ids)
        end
        unless search.blank?
          @all_members = @all_members.joins(user: [:user_extension]).where('concat(users.lastname, users.firstname) like ? or user_extensions.student_id like ?',"%#{search}%","%#{search}%")
        end

        if @all_members.length == 0
          normal_status(-1,"暂无学生数据")
        elsif params[:export].present? && params[:export]
          normal_status(0,"正在下载中")
        else
          @c_homeworks = @course.homework_commons.homework_published.order("homework_commons.publish_time asc, homework_commons.created_at asc")
          @c_exercises = @course.exercises.is_exercise_published.order("exercises.publish_time asc, exercises.created_at asc")
          # @c_polls = @course.polls.publish_or_not.order("polls.publish_time asc, polls.created_at asc")
          @c_tasks = @course.graduation_tasks.task_published.order("graduation_tasks.publish_time asc, graduation_tasks.created_at asc")

          set_export_cookies
          member_to_xlsx(@course, @all_members.includes(user: :user_extension), @c_homeworks, @c_exercises, @c_tasks)
          filename_ = "#{current_user.real_name}_#{@course.name}_总成绩_#{Time.now.strftime('%Y%m%d_%H%M%S')}"
          render xlsx: "#{format_sheet_name filename_.strip}",template: "courses/export_member_scores_excel.xlsx.axlsx",
                 locals: {course_scores:@course_user_scores,shixun_works:@shixun_work_arrays,
                          common_works:@common_work_arrays,group_works:@group_work_arrays,task_works:@task_work_arrays,
                          exercise_works:@exercise_work_arrays}
        end

      rescue Exception => e
        uid_logger_error(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 计算课堂所有已发布的实训作业成绩
  def calculate_all_shixun_scores
    tip_exception(-1, "课堂已结束") if @course.is_end
    shixun_homeworks = @course.homework_commons.homework_published.where(homework_type: 4)
    shixun_homeworks.includes(:homework_challenge_settings, :published_settings, :homework_commons_shixun).each do |homework|
      homework.update_homework_work_score
    end
    normal_status(0, "更新成功")
  end

  def search_slim
    courses = current_user.manage_courses.not_deleted.processing
    courses = courses.where(id: current_laboratory.all_courses)

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      courses = courses.where('name LIKE ?', "%#{keyword}%")
    end

    count = courses.count
    courses = paginate(courses)

    render_ok(count: count, courses: courses.select(:id, :name).as_json)
  end

  def tasks_list
    case params[:container_type]
    when 'shixun_homework'
      @tasks = @course.practice_homeworks
    when 'common_homework'
      @tasks = @course.normal_homeworks
    when 'group_homework'
      @tasks = @course.group_homeworks
    when 'exercise'
      @tasks = @course.exercises
    when 'poll'
      @tasks = @course.polls
    when 'graduation_topic'
      @tasks = @course.graduation_topics
    when 'graduation_task'
      @tasks = @course.graduation_tasks
    when 'attachment'
      @tasks = @course.attachments
    else
      tip_exception("请指定任务类型")
    end
  end

  def update_task_position
    Rails.logger.info("#######task_ids_length#{params[:task_ids].uniq.length}#########task_count:#{@tasks.count}")
    tip_exception("task_ids参数有误") if params[:task_ids].blank? || params[:task_ids].uniq.length != @tasks.count
    ActiveRecord::Base.transaction do
      begin
        @tasks.each do |task|
          position = params[:task_ids].reverse.index(task.id).to_i + 1
          task.update_attributes!(position: position)
        end
        normal_status(0, "移动成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_course
    @course = Course.find_by!(id: params[:id])
    tip_exception(404, "") if @course.is_delete == 1 && !current_user.admin_or_business?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def course_params
    params.require(:course).permit(:name, :class_period, :credit, :end_date, :is_public, :authentication, :professional_certification)
  end

  def validate_course_name
    tip_exception("课堂名称不能为空！") if params[:course][:name].blank?
    if params[:subject_id].blank? && @course.blank? || (@course && @course.subject.blank?)
      tip_exception("课程名称不能为空！") if params[:course_list_name].blank?
      tip_exception("课堂名称应以课程名称开头命名") unless params[:course][:name].index(params[:course_list_name]) &&
        params[:course][:name].index(params[:course_list_name]) == 0
    else
      @subject = @course.present? ? @course.subject : Subject.find_by!(id: params[:subject_id])
      tip_exception("开始时间不能为空") if params[:start_date].blank?
      tip_exception("结束时间不能为空") if params[:end_date].blank?
      tip_exception("结束时间必须晚于开始时间") if strf_date(params[:end_date]) <= strf_date(params[:start_date])
      tip_exception("开始时间和结束时间不能早于往期开课时间") if @course.nil? && @subject.max_course_end_date && strf_date(params[:start_date]) <= strf_date(@subject.max_course_end_date)
      validate_start_end_date if @course.present?
      tip_exception("开放课堂必须包含公告栏和在线学习模块") unless params[:course_module_types].include?("announcement") && params[:course_module_types].include?("online_learning")
    end
    tip_exception("课堂所属单位不能为空！") if params[:school].blank?
    tip_exception("请至少添加一个课堂模块") if params[:course_module_types].blank?
    @school = School.find_by(name: params[:school].strip)
    tip_exception("所属单位不存在") unless @school.present?
  end

  def validate_start_end_date
    prev_course = @subject.courses.where("id < #{@course.id}").last
    next_course = @subject.courses.where("id > #{@course.id}").first
    tip_exception("开始时间不能与往期开课时间重叠") if prev_course && strf_date(params[:start_date]) <= strf_date(prev_course.end_date)
    tip_exception("结束时间不能与后期开课时间重叠") if next_course && strf_date(params[:end_date]) >= strf_date(next_course.start_date)
  end

  # 超级管理员和课堂管理员的权限判断
  def admin_allowed
    unless @user_course_identity < Course::PROFESSOR
      tip_exception(403, "..")
    end
  end

  # 课堂教师的权限判断
  def teacher_allowed
    unless @user_course_identity < Course::STUDENT
      tip_exception(403, "..")
    end
  end

  # 课堂教师，课堂管理员以及超级管理员的权限判断
  def teacher_or_admin_allowed
    unless @user_course_identity < Course::ASSISTANT_PROFESSOR
      tip_exception(403, "..")
    end
  end

  def course_member_allowed
    tip_exception(403, "..") if @user_course_identity > Course::STUDENT
  end

  def course_tasks
    case params[:container_type]
    when 'shixun_homework'
      @tasks = @course.practice_homeworks
    when 'common_homework'
      @tasks = @course.normal_homeworks
    when 'group_homework'
      @tasks = @course.group_homeworks
    when 'exercise'
      @tasks = @course.exercises
    when 'poll'
      @tasks = @course.polls
    when 'graduation_topic'
      @tasks = @course.graduation_topics
    when 'graduation_task'
      @tasks = @course.graduation_tasks
    when 'attachment'
      @tasks = @course.attachments
    else
      tip_exception("请指定任务类型")
    end
  end

  def validate_inform_params
    tip_exception("公告标题不能为空") if params[:name].blank?
    tip_exception("公告内容不能为空") if params[:description].blank?
  end

  # def find_container
  #   case params[:container_type]
  #   when 'shixun_homework', 'common_homework', 'group_homework'
  #     @task = HomeworkCommon.find_by(id: params[:container_id])
  #   when 'exercise'
  #     @task = Exercise.find_by(id: params[:container_id])
  #   when 'poll'
  #     @task = Poll.find_by(id: params[:container_id])
  #   when 'graduation_topic'
  #     @task = GraduationTopic.find_by(id: params[:container_id])
  #   when 'graduation_task'
  #     @task = GraduationTask.find_by(id: params[:container_id])
  #   when 'attachment'
  #     @task = Attachment.find_by(id: params[:container_id])
  #   else
  #     tip_exception("container_type参数有误")
  #   end
  # end

  def student_act_score group_id, search
    sql_select = %Q{SELECT cm.*,
        (SELECT max(student_id) FROM user_extensions WHERE user_extensions.user_id = cm.user_id) AS student_id,
        (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{@course.id}
                AND messages.author_id = cm.user_id and messages.parent_id is null) AS message_num,
        (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{@course.id}
                AND messages.author_id = cm.user_id and messages.parent_id is not null) AS message_reply_num,
        (SELECT count(attachments.id) FROM attachments WHERE container_id = #{@course.id} and container_type = "Course"
                AND attachments.author_id = cm.user_id) AS resource_num,
        (SELECT count(jfm.id) FROM journals_for_messages AS jfm, homework_commons hs WHERE jfm.jour_id = hs.id AND
                jfm.user_id = cm.user_id and jfm.jour_type = "HomeworkCommon" and hs.course_id = #{@course.id}) AS homework_journal_num,
        (SELECT COUNT(gw.id) FROM graduation_works AS gw, graduation_tasks AS gt WHERE gw.graduation_task_id = gt.id AND
                gt.course_id = #{@course.id} AND gw.work_status != 0 AND gw.user_id = cm.user_id) AS graduation_num,
        (SELECT COUNT(ss.id) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                hc.course_id = #{@course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id) AS homework_num,
        (SELECT COUNT(eu.id) FROM exercise_users AS eu,exercises WHERE eu.exercise_id = exercises.id AND exercises.course_id = #{@course.id}
                AND eu.commit_status = 1 AND eu.user_id = cm.user_id) AS exercise_num,
        (SELECT COUNT(pu.id) FROM poll_users AS pu, polls WHERE pu.poll_id = polls.id AND polls.course_id = #{@course.id}
                AND pu.commit_status = 1 AND pu.user_id = cm.user_id) AS poll_num
        FROM course_members cm}
    if search.present? && group_id.present?
      sql_select += %Q{ join users on cm.user_id = users.id
                      join user_extensions ue on ue.user_id = users.id
                      WHERE cm.role = 4 and cm.course_id = #{@course.id} and cm.course_group_id = #{group_id} and
                      (concat(users.lastname, users.firstname) like '%#{search}%' or ue.student_id like '%#{search}%')}

    elsif search.present?
      sql_select += %Q{ join users on cm.user_id = users.id
                      join user_extensions ue on ue.user_id = users.id
                      WHERE cm.role = 4 and
                      (concat(users.lastname, users.firstname) like '%#{search}%' or ue.student_id like '%#{search}%')}
    elsif group_id.present?
      group_id = group_id.is_a?(Array) ? group_id.map(&:to_i) : [group_id.to_i]
      sql_select += %Q{ WHERE cm.role = 4 and cm.course_id = #{@course.id} and cm.course_group_id in (#{group_id.join(",")})}
    else
      sql_select += %Q{ WHERE cm.role = 4 and cm.course_id = #{@course.id}}
    end
    act_scores = CourseMember.find_by_sql(sql_select)
    act_scores
  end

  def course_statistics course, max_exp, limit
    max_rate = max_exp.nil? || max_exp <= 0 ? 0 : 20.0 / max_exp

    sql_select = %Q{ SELECT a.*, (message_num*0.2 + message_reply_num*0.1 + resource_num*0.5 + homework_journal_num*0.1 + graduation_num +
                  homework_num + exercise_num + poll_num*0.7 + exercise_score * 0.7 + graduation_score * 0.7 + homework_score * 0.7 + exp*#{max_rate})
                  AS score from
                  (select cm.*, users.experience as exp,
                  (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{course.id}
                          AND messages.author_id = cm.user_id and messages.parent_id is null) AS message_num,
                  (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{course.id}
                          AND messages.author_id = cm.user_id and messages.parent_id is not null) AS message_reply_num,
                  (SELECT count(attachments.id) FROM attachments WHERE container_id = #{course.id} and container_type = "Course"
                          AND attachments.author_id = cm.user_id) AS resource_num,
                  (SELECT count(jfm.id) FROM journals_for_messages AS jfm, homework_commons hs WHERE jfm.jour_id = hs.id AND
                          jfm.user_id = cm.user_id and jfm.jour_type = "HomeworkCommon" and hs.course_id = #{course.id}) AS homework_journal_num,
                  (SELECT COUNT(gw.id) FROM graduation_works AS gw, graduation_tasks AS gt WHERE gw.graduation_task_id = gt.id AND
                          gt.course_id = #{course.id} AND gw.work_status != 0 AND gw.user_id = cm.user_id) AS graduation_num,
                  (SELECT IFNULL(sum(gw.work_score),0) FROM graduation_works AS gw, graduation_tasks AS gt WHERE gw.graduation_task_id = gt.id AND
                          gt.course_id = #{course.id} AND gw.work_status != 0 AND gw.user_id = cm.user_id) AS graduation_score,
                  (SELECT COUNT(ss.id) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                          hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id) AS homework_num,
                  (SELECT IFNULL(sum(ss.work_score),0) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                          hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id) AS homework_score,
                  (SELECT COUNT(eu.id) FROM exercise_users AS eu,exercises WHERE eu.exercise_id = exercises.id AND exercises.course_id = #{course.id}
                          AND eu.commit_status = 1 AND eu.user_id = cm.user_id) AS exercise_num,
                  (SELECT IFNULL(sum(eu.score),0) FROM exercise_users AS eu,exercises WHERE eu.exercise_id = exercises.id AND exercises.course_id = #{course.id}
                          AND eu.commit_status = 1 AND eu.user_id = cm.user_id) AS exercise_score,
                  (SELECT COUNT(pu.id) FROM poll_users AS pu, polls WHERE pu.poll_id = polls.id AND polls.course_id = #{course.id}
                          AND pu.commit_status = 1 AND pu.user_id = cm.user_id) AS poll_num
                  FROM course_members cm join users on cm.user_id = users.id
                              WHERE cm.role = 4 and cm.course_id = #{course.id}) a ORDER BY score desc limit #{limit};
                  }
    CourseMember.find_by_sql(sql_select)
  end

  def course_work_scores course, sort, group_ids
    sql_select = %Q{ SELECT a.*,
                  (exercise_score + graduation_score + common_score + practice_score + group_score) AS score from
                  (select cm.*,
                  (SELECT IFNULL(sum(gw.work_score),0) FROM graduation_works AS gw, graduation_tasks AS gt WHERE gw.graduation_task_id = gt.id AND
                  gt.course_id = #{course.id} AND gw.work_status != 0 AND gw.user_id = cm.user_id) AS graduation_score,
                  (SELECT IFNULL(sum(ss.work_score),0) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                  hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id and hc.homework_type=1) AS common_score,
                  (SELECT IFNULL(sum(ss.work_score),0) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                  hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id and hc.homework_type=3) AS group_score,
                  (SELECT IFNULL(sum(ss.work_score),0) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                  hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id and hc.homework_type=4) AS practice_score,
                  (SELECT IFNULL(sum(eu.score),0) FROM exercise_users AS eu,exercises WHERE eu.exercise_id = exercises.id AND exercises.course_id = #{course.id}
                  AND eu.commit_status = 1 AND eu.user_id = cm.user_id) AS exercise_score
                  FROM course_members cm join users on cm.user_id = users.id
                  WHERE cm.role = 4 and cm.course_id = #{course.id}
                  }

    sql_select += %Q{ and cm.course_group_id in (#{group_ids.join(",")}) } if group_ids.present?
    sql_select += %Q{ ) a ORDER BY score #{sort}; }
    course_members = CourseMember.find_by_sql(sql_select)
    course_members
  end

  def course_act_scores course, group_ids
    sql_select = %Q{ SELECT a.*,
                  (message_num*2 + message_reply_num + resource_num*5 + homework_journal_num + graduation_num*10 + homework_num*10 + exercise_num*10 + poll_num*7) AS score from
                  (select cm.*,
                  (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{course.id}
                          AND messages.author_id = cm.user_id and messages.parent_id is null) AS message_num,
                  (SELECT count(messages.id) FROM messages join boards on messages.board_id = boards.id WHERE boards.course_id = #{course.id}
                          AND messages.author_id = cm.user_id and messages.parent_id is not null) AS message_reply_num,
                  (SELECT count(attachments.id) FROM attachments WHERE container_id = #{course.id} and container_type = "Course"
                          AND attachments.author_id = cm.user_id) AS resource_num,
                  (SELECT count(jfm.id) FROM journals_for_messages AS jfm, homework_commons hs WHERE jfm.jour_id = hs.id AND
                          jfm.user_id = cm.user_id and jfm.jour_type = "HomeworkCommon" and hs.course_id = #{course.id}) AS homework_journal_num,
                  (SELECT COUNT(gw.id) FROM graduation_works AS gw, graduation_tasks AS gt WHERE gw.graduation_task_id = gt.id AND
                          gt.course_id = #{course.id} AND gw.work_status != 0 AND gw.user_id = cm.user_id) AS graduation_num,
                  (SELECT COUNT(ss.id) FROM student_works AS ss ,homework_commons AS hc WHERE ss.homework_common_id = hc.id AND
                          hc.course_id = #{course.id} AND ss.work_status != 0 AND ss.user_id = cm.user_id) AS homework_num,
                  (SELECT COUNT(eu.id) FROM exercise_users AS eu,exercises WHERE eu.exercise_id = exercises.id AND exercises.course_id = #{course.id}
                          AND eu.commit_status = 1 AND eu.user_id = cm.user_id) AS exercise_num,
                  (SELECT COUNT(pu.id) FROM poll_users AS pu, polls WHERE pu.poll_id = polls.id AND polls.course_id = #{course.id}
                          AND pu.commit_status = 1 AND pu.user_id = cm.user_id) AS poll_num
                  FROM course_members cm join users on cm.user_id = users.id
                  join user_extensions ue on ue.user_id = users.id
                  WHERE cm.role = 4 and cm.course_id = #{course.id}
                  }

    sql_select += %Q{ and cm.course_group_id in (#{group_ids.join(",")}) } if group_ids.present?
    sql_select += %Q{ ) a ORDER BY score desc; }
    course_members = CourseMember.find_by_sql(sql_select)
    course_members
  end
end
