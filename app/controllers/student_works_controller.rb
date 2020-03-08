class StudentWorksController < ApplicationController
  include HomeworkCommonsHelper
  include StudentWorksHelper

  before_action :require_login, :check_auth
  before_action :find_homework, only: [:new, :create, :search_member_list, :check_project, :relate_project,
                                       :cancel_relate_project, :delete_work]
  before_action :find_work, only: [:shixun_work_report, :adjust_review_score, :shixun_work, :commit_des, :update_des,
                                   :adjust_score, :show, :adjust_score, :supply_attachments, :revise_attachment,
                                   :comment_list, :add_score, :add_score_reply, :destroy_score, :appeal_anonymous_score,
                                   :deal_appeal_score, :cancel_appeal, :edit, :update, :export_shixun_work_report,
                                   :shixun_work_comment, :destroy_work_comment]
  before_action :user_course_identity
  before_action :allow_add_score, only: [:add_score]
  before_action :homework_publish

  before_action :teacher_allowed, only: [:adjust_score, :adjust_review_score, :deal_appeal_score, :shixun_work_comment,
                                         :destroy_work_comment]

  before_action :course_student, only: [:new, :commit_des, :update_des, :create, :edit, :update, :search_member_list, :relate_project,
                                        :cancel_relate_project, :relate_project, :delete_work]

  before_action :my_work, only: [:commit_des, :update_des, :edit, :update, :revise_attachment, :appeal_anonymous_score,
                                 :cancel_appeal]

  before_action :edit_duration, only: [:edit, :update, :delete_work]
  before_action :end_or_late, only: [:new, :create, :search_member_list, :commit_des, :update_des]

  before_action :require_score_id, only: [:destroy_score, :add_score_reply, :appeal_anonymous_score, :deal_appeal_score, :cancel_appeal]

  before_action :is_evaluation, :open_work, only: [:show, :supply_attachments]

  def new
    uid_logger("#######new current_user : 1111")
    @current_user = current_user
    uid_logger("#######new current_user : #{@current_user.id}")
    if @homework.homework_type == "group" && @homework.homework_detail_group.try(:base_on_project)
      work = @homework.student_works.find_by(user_id: @current_user.id)
      if work.present? && (work.work_status != 0 || work.project_id == 0)
        normal_status(403, "")
      end
    end
  end

  # 搜索课堂学生
  def search_member_list
    # 统一设置的作业取所有学生，否则取已发布的分班学生
    students = @homework.unified_setting? ? @course.students : @course.students.where(course_group_id: @homework.published_settings.pluck(:course_group_id))
    if !params[:search].blank?
      @members = students.joins(user: :user_extension).where("course_members.user_id != #{current_user.id} and (concat(users.lastname, users.firstname)
                  like ? or user_extensions.student_id like ?)", "%#{params[:search]}%", "%#{params[:search]}%")
    else

      # 没有搜索条件时搜索课堂所有未提交的学生
      user_ids = @homework.student_works.where("work_status = 0").pluck(:user_id) - [current_user.id]
      @members = students.where(user_id: user_ids)
    end

    page = params[:page] ? params[:page].to_i : 1
    limit = params[:limit] ? params[:limit].to_i : 10

    # todo user_extension
    @members = @members.page(page).per(limit).includes(:course_group, user: :user_extension)
  end

  def delete_work
    ActiveRecord::Base.transaction do
      begin
        work = @homework.student_works.find_by!(user_id: params[:user_id])
        tip_exception("只有组长才能删除组员") if work.commit_user_id != current_user.id
        work.update_attributes!(description: nil, project_id: 0,
                                   late_penalty: 0, work_status: 0,
                                   commit_time: nil, update_time: nil, group_id: 0,
                                   commit_user_id: nil, final_score: nil, work_score: nil, teacher_score: nil, teaching_asistant_score: nil)
        work.attachments.destroy_all
        work.tidings.destroy_all
        normal_status("删除成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
      end
    end
  end

  def create
    student_work = @homework.student_works.find_or_create_by(user_id: current_user.id)

    tip_exception("作业不可重复提交") if student_work.work_status != 0
    update_check student_work

    student_ids = [current_user.id]
    ActiveRecord::Base.transaction do
      begin
        student_work.description = params[:description]
        student_work.commit_time = Time.now
        student_work.update_time = Time.now
        student_work.commit_user_id = current_user.id
        student_work.update_user_id = current_user.id
        student_work.group_id = @homework.homework_type == "group" ? @homework.max_group_id : 0

        #提交作品时，计算是否迟交
        homework_setting = @homework.homework_group_setting(current_user.id)
        student_work.late_penalty = homework_setting.end_time < Time.now ? @homework.late_penalty : 0
        student_work.work_status = homework_setting.end_time < Time.now ? 2 : 1

        if student_work.save!
          Attachment.associate_container(params[:attachment_ids], student_work.id, student_work.class)

          if @homework.homework_type == "group"
            members = (params[:user_ids] || []).collect(&:to_i) - [current_user.id]
            members = @course.students.pluck(:user_id) & members
            student_ids += members
            for i in 0 .. members.count-1
              stu_work = @homework.student_works.find_or_initialize_by(user_id: members[i].to_i)
              stu_work.update_attributes!(user_id: members[i].to_i, description: student_work.description,
                                         homework_common_id: @homework.id, project_id: student_work.project_id,
                                         late_penalty: student_work.late_penalty, work_status: student_work.work_status,
                                         commit_time: Time.now, update_time: Time.now, group_id: student_work.group_id,
                                         commit_user_id: current_user.id, update_user_id: current_user.id)
              stu_work.save!
              student_work.attachments.each do |attachment|
                att = attachment.copy
                att.author_id = attachment.author_id
                stu_work.attachments << att
              end
            end
          end
          @homework.update_column(:updated_at, Time.now)
          # todo 更新对应的作业课堂动态
          # update_course_activity(@taskhomework.class,@task.id)

          @work_id = student_work.id
        end

      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end

    SubmitStudentWorkNotifyJob.perform_later(@homework.id, student_ids)
  end

  def edit
    @current_user = current_user
    if @homework.homework_type == "group"
      # todo user_extension
      @commit_user_id = @work.commit_user_id
      @work_members = @course.students.where(user_id: @homework.student_works.where(group_id: @work.group_id).pluck(:user_id)).
          order("course_members.user_id=#{@work.commit_user_id} desc").includes(:course_group, user: :user_extension)
    end
  end

  def update
    update_check @work

    student_ids = []
    ActiveRecord::Base.transaction do
      begin
        @work.description = params[:description]
        @work.update_time = Time.now
        @work.update_user_id = current_user.id
        # @work.commit_user_id = current_user.id
        if @work.save!
          Attachment.associate_container(params[:attachment_ids], @work.id, @work.class)

          #如果学生作品被打分后修改，应该给老师提示
          student_ids << @work.user_id if @work.scored?

          if @homework.homework_type == "group"
            student_works = @homework.student_works.where("group_id = #{@work.group_id} and user_id != #{@work.user_id}")
            work_user_ids = student_works.pluck(:user_id)
            params_user_ids = (params[:user_ids] || []).collect(&:to_i) - [@work.user_id]
            params_user_ids = @course.students.pluck(:user_id) & params_user_ids

            # 原成员更新描述、更新时间以及附件
            @homework.student_works.where(group_id: @work.group_id, user_id: (work_user_ids & params_user_ids)).each do |work|
              # work.update_attributes(update_time: Time.now, description: @work.description, commit_user_id: current_user.id)
              work.update_attributes!(update_time: Time.now, description: @work.description, update_user_id: current_user.id)
              work.attachments.destroy_all
              @work.attachments.each do |attachment|
                att = attachment.copy
                att.author_id = attachment.author_id
                work.attachments << att
              end
              student_ids << work.user_id if work.scored?
            end

            # 删除的成员
            delete_user_ids = work_user_ids - params_user_ids
            @homework.student_works.where(group_id: @work.group_id, user_id: delete_user_ids).each do |work|
              work.attachments.destroy_all
              # work.student_works_scores.destroy_all
              work.tidings.destroy_all
            end
            @homework.student_works.where(group_id: @work.group_id, user_id: delete_user_ids).
                update_all(work_status: 0, description: nil, late_penalty: 0, commit_time: nil, update_time: nil,
                           final_score: nil, teacher_score: nil, student_score: nil, teaching_asistant_score: nil,
                           work_score: nil, project_id: 0, group_id: 0, commit_user_id: nil, update_user_id: nil)

            # 新增加的成员
            (params_user_ids - work_user_ids).each do |user_id|
              stu_work = @homework.student_works.find_or_initialize_by(user_id: user_id)
              stu_work.update_attributes!(user_id: user_id, description: @work.description, homework_common_id: @homework.id,
                                         project_id: @work.project_id, late_penalty: @work.late_penalty,
                                         work_status: @work.work_status, commit_time: Time.now, update_time: Time.now,
                                         group_id: @work.group_id, commit_user_id: @work.commit_user_id, update_user_id: current_user.id)
              @work.attachments.each do |attachment|
                att = attachment.copy
                att.author_id = attachment.author_id
                stu_work.attachments << att
              end

              student_ids << user_id
            end
          end

          normal_status(0,"更新成功")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end

      ResubmitStudentWorkNotifyJob.perform_later(@homework.id, student_ids) if student_ids.present?
    end
  end

  def show
    @current_user = current_user
    @work_members = @homework.homework_type != "group" ? [] : @homework.student_works.where.not(user_id: @work.user_id).
        where(group_id: @work.group_id).includes(:user)
    @attachments = @work.attachments.where("attachtype != 7 or attachtype is null")
  end

  # 判断项目是否已有其他作品关联上了
  def check_project
    tip_exception("项目id不能为空") if params[:project_id].blank?
    work = @homework.student_works.find_by_project_id(params[:project_id])
    @is_relate = work.present?
    @relate_user = work.present? ? work.user.real_name : ""
  end

  def relate_project
    tip_exception("项目id不能为空") if params[:project_id].blank?

    ActiveRecord::Base.transaction do
      begin
        # 判断项目是否存在且当前用户是项目管理员
        project = Project.find_by_id(params[:project_id])
        member = Member.find_by_project_id_and_user_id(project.try(:id), current_user.id)

        if project.present? && member.present? && member.member_roles.take.try(:role_id) == 3

          work = @homework.student_works.find_or_create_by(user_id: current_user.id)

          if work.work_status == 0 && work.project_id == 0
            work.update_attributes!(project_id: project.id, update_time: Time.now)

            # 将老师加入项目
            project_member = project.members.find_by_user_id(@homework.user_id)
            if project_member.present?
              project_member.member_roles.take.update_attributes!(role_id: 3) if project_member.member_roles.take.present?
            else
              member = Member.create!(user_id: @homework.user_id, project_id: project.id)
              member.member_roles << MemberRole.new(role_id: 3)
              Tiding.create(user_id: @homework.user_id, trigger_user_id: current_user.id, container_id: project.id,
                            container_type: 'ManagerJoinProject', belong_container_id: project.id,
                            belong_container_type: "Project", tiding_type: "System", extra: 3)
            end
            normal_status(0,"关联成功")
          else
            tip_exception("不能重复关联项目")
          end
        else
          tip_exception("该项目不存在")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def cancel_relate_project
    work = @homework.student_works.find_by_user_id_and_work_status(current_user.id, 0)
    if work.present? && work.project.present?
      ActiveRecord::Base.transaction do
        begin
          member = work.project.members.find_by_user_id(@homework.user_id)
          member.destroy if member.present?
          Tiding.where(user_id: @homework.user_id, trigger_user_id: current_user.id, container_id: work.project.id,
                       container_type: 'ManagerJoinProject').destroy_all

          work.update_attributes!(project_id: 0)
          normal_status(0,"取消关联成功")

        rescue Exception => e
          uid_logger(e.message)
          tip_exception(e.message)
          raise ActiveRecord::Rollback
        end
      end
    else
      tip_exception("无法取消关联")
    end
  end

  def supply_attachments
    @revise_attachments = @work.attachments.where(attachtype: 7)
    @last_atta = @revise_attachments.last
  end

  def revise_attachment
    tip_exception("不在补交阶段内") unless @homework.late_duration
    tip_exception("附件参数有误") if params[:attachment_ids].blank? || !params[:attachment_ids].is_a?(Array)
    tip_exception("补交附件原因不能为空") if params[:description].blank?

    ActiveRecord::Base.transaction do
      begin
        # 补交作业附件不覆盖之前上传的附件
        # revise_attachment = @work.attachments.where(attachtype: 7).reorder("created_on desc").last
        # if revise_attachment.present? && @work.student_works_scores.where("created_at > '#{revise_attachment.created_on}'
        #                                                                  and score is not null").count == 0
        #   revise_attachment.destroy
        # end
        Attachment.associate_container(params[:attachment_ids], @work.id, @work.class, 7)
        revise_attachment = Attachment.where(attachtype: 7, container_id: @work.id, container_type: "StudentWork").last
        revise_attachment.update_attributes!(description: params[:description]) if revise_attachment.present?

        @work.update_attributes!(update_time: Time.now)

        # 补交附件时给评阅过作品的教师、助教发消息
        unless @work.student_works_scores.where.not(score: nil).where(reviewer_role: [1, 2]).pluck(:user_id).uniq.blank?
          ResubmitStudentWorkNotifyJob.perform_later(@homework.id, [current_user.id])
        end

        normal_status(0, "提交成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def comment_list
    @current_user = current_user
    @last_comment = @work.student_works_scores.where(user_id: @current_user.id).last
    # todo user_extension
    @comment_scores = (@user_course_identity < Course::STUDENT || current_user == @work.user) ?
                          @work.student_works_scores.reorder("created_at desc") :
                          @work.student_works_scores.where(user_id: current_user.id).reorder("created_at desc")
    @comment_scores = @comment_scores.includes(:student_works_scores_appeal, :attachments, journals_for_messages: :user, user: :user_extension)
  end

  # 给作品评分
  def add_score
    tip_exception("该学生的分数已经过调整，不能再评阅") if @work.ultimate_score
    tip_exception("分数和评语不能都为空") if params[:score].blank? && params[:comment].blank?
    tip_exception("分数不能超过0-100") if params[:score] && (params[:score].to_f < 0 || params[:score].to_f > 100)

    ActiveRecord::Base.transaction do
      begin
        # 没传score则取上次评分成绩
        reviewer_role = @user_course_identity == Course::STUDENT ? 3 : @user_course_identity == Course::ASSISTANT_PROFESSOR ? 2 : 1
        new_score = StudentWorksScore.new
        score = StudentWorksScore.where(user_id: current_user.id, student_work_id: @work.id, reviewer_role: reviewer_role).last
        new_score.score = params[:score].blank? ? score.try(:score) : params[:score].to_f
        new_score.comment = params[:comment] if params[:comment] && params[:comment].strip != ""
        new_score.user_id = current_user.id
        new_score.student_work_id = @work.id

        # 如果作品是未提交的状态则更新为已提交
        if @user_course_identity < Course::STUDENT && !new_score.score.nil? && @work.work_status == 0
          @work.update_attributes!(work_status: 1, commit_time: Time.now)
          # 分组作业更新分组id
          @work.update_attributes!(group_id: @homework.max_group_id) if @homework.homework_type == "group"
        end

        new_score.reviewer_role = reviewer_role

        if new_score.save!
          Attachment.associate_container(params[:attachment_ids], new_score.id, new_score.class)

          # 该用户的历史评阅无效
          score.update_column('is_invalid', true) if score.present? && score.score.present?

          Tiding.create(user_id: @work.user_id, trigger_user_id: User.current.id, container_id: new_score.id,
                        container_type: "StudentWorksScore", parent_container_id: @work.id,
                        parent_container_type: "HomeworkCommon", belong_container_id: @homework.course_id,
                        belong_container_type: "Course", viewed: 0, tiding_type: new_score.reviewer_role == 3 ? "System" : "HomeworkCommon", extra: new_score.reviewer_role)

          case new_score.reviewer_role
          when 1 #教师评分：最后一个教师评分为最终评分
            @work.teacher_score = new_score.score
            if @homework.homework_type == "group" && params[:same_score]
              add_score_to_member @work, @homework, new_score
            end
          when 2 #教辅评分 教辅评分显示平均分
            # 助教评分：普通模式则是平均分，复审模式则是最新评分
            if @homework.homework_detail_manual.ta_mode == 1
              @work.teaching_asistant_score = new_score.ta_score @work.id
            else
              @work.teaching_asistant_score = new_score.score
            end

            if @homework.homework_type == "group" && params[:same_score]
              add_score_to_member @work, @homework, new_score
            end
          when 3 #学生评分 学生评分显示平均分
            # 匿评分
            @work.student_score = new_score.stu_score(@work.id)
            if @homework.homework_type == "group" && new_score.score.present?
              add_score_to_member @work, @homework, new_score
            end

            current_user.student_works_scores.where(student_work_id: @work.id, reviewer_role: 3, appeal_status: 1).update_all(appeal_status: 5)
          end

          @homework.update_column('updated_at', Time.now)
          # update_course_activity(@homework.class,@homework.id)
          @work.save!

          normal_status(0,"提交成功")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 实训作品的提交总结
  def commit_des
    @current_user = current_user
  end

  # 实训作品的总结
  def update_des
    @work.update_attributes!(des_params)
    tip_exception(0, "提交成功")
  end

  # 实训作品弹框
  def shixun_work
    @myshixun = @work.myshixun
    if @myshixun.present?
      @current_user = current_user
      @work_user = @work.user
      @shixun = @homework.shixuns.take
    else
      tip_exception("作品还未提交")
    end
  end

  # 实训报告
  def shixun_work_report
    @user = @work.user
    @shixun = @homework.shixuns.take
    # 提示： 这里如果includes outputs表的话： sum(:evaluate_count)会出现错误
    @games = @work.myshixun.games.joins(:challenge).reorder("challenges.position asc") if @work.myshixun
    @challenges = @shixun.challenges if @shixun
    @comment = @work.shixun_work_comments.find_by(challenge_id: 0)

    # 用户最大评测次数
    if @games
      @user_evaluate_count = @games.pluck(:evaluate_count).sum
      @games = @games.includes(:challenge, :game_codes, :outputs)
    else
      @user_evaluate_count = 0
    end

    # 图形效率图的数据
    @echart_data = student_efficiency(@homework, @work) if @work.myshixun
  end

  # 实训作品的评阅
  def shixun_work_comment
    tip_exception("请至少输入一个评阅") if params[:comment].blank? && params[:hidden_comment].blank?
    ActiveRecord::Base.transaction do
      challenge = @homework.shixuns.first&.challenges.find_by(id: params[:challenge_id]) unless params[:challenge_id].blank?
      if challenge.present?
        @comment = @work.shixun_work_comments.find_by(challenge_id: challenge.id) ||
          ShixunWorkComment.new(student_work_id: @work.id, user_id: current_user.id, challenge_id: challenge.id)
      else
        @comment = @work.shixun_work_comments.find_by(challenge_id: 0) ||
          ShixunWorkComment.new(student_work_id: @work.id, user_id: current_user.id, challenge_id: 0)
      end
      @comment.comment = params[:comment]
      @comment.hidden_comment = params[:hidden_comment]
      @comment.save!
      if @work.work_status == 0
        @work.update_attributes!(work_status: 1, commit_time: @homework.end_time, update_time: Time.now, work_score: 0, final_score: 0)
      end
    end
  end

  # 删除实训作品评阅
  def destroy_work_comment
    ActiveRecord::Base.transaction do
      # tip_exception("visible_comment参数有误") if params[:visible_comment].nil?

      comment = @work.shixun_work_comments.find_by!(id: params[:comment_id])
      comment.destroy!
      # params[:visible_comment] ? comment.comment = nil : comment.hidden_comment = nil
      # if comment.comment.nil? && comment.hidden_comment.nil?
      #   comment.destroy!
      # else
      #   comment.save!
      # end
      normal_status("删除成功")
    end
  end

  def export_shixun_work_report
    @user = @work.user
    @shixun = @homework.shixuns.take
    @games = @work.myshixun.games.includes(:challenge, :game_codes, :outputs) if @work.myshixun
    @challenges = @shixun.challenges if @shixun

    # 用户最大评测次数
    @user_evaluate_count = @games.pluck(:evaluate_count).sum if @games
    # 图形效率图的数据
    @echart_data = student_efficiency(@homework, @work)
    @myself_eff = @echart_data[:efficiency_list].find { |item| item.last == @user.id }
    @myself_consume = @echart_data[:consume_list].find { |item| item.last == @user.id }
    filename_ = "#{@homework.course&.user_group_name(@work.user_id)}_#{@user&.student_id}_#{@user&.real_name}_#{@shixun&.name}_#{Time.now.strftime('%Y%m%d_%H%M%S')}.pdf"
    filename = filename_.strip.tr("+/", "-_")
    stylesheets = %w(shixun_work/shixun_work.css shared/codemirror.css)
    if params[:export].present? && params[:export]
      normal_status(0,"正在下载中")
    else
      set_export_cookies
      render pdf: 'shixun_work/shixun_work', filename: filename, stylesheets: stylesheets, disposition: 'inline', type:"pdf_attachment.content_type",stream:false
    end
    # render pdf: 'shixun_work/shixun_work', filename: filename, stylesheets: stylesheets, disposition: 'inline', type:"pdf_attachment.content_type",stream:false
  end

  # 作品调分
  def adjust_score
    tip_exception("成绩不能为空") if params[:score].blank?
    tip_exception("成绩不能小于零") if params[:score].to_f < 0
    tip_exception("成绩不能大于100") if params[:score].to_f.round(1) > 100
    tip_exception("调分原因不能超过100个字符") if params[:comment].present? && params[:comment].length > 100
    ActiveRecord::Base.transaction do
      begin
        # 分数不为空的历史评阅都置为失效
        @work.student_works_scores.where.not(score: nil).update_all(is_invalid: 1)
        reviewer_role = @user_course_identity == Course::ASSISTANT_PROFESSOR ? 2 : 1
        new_score = StudentWorksScore.new(student_work_id: @work.id, score: params[:score].to_f, comment: "使用调分功能调整了作业最终成绩：#{params[:comment]}",
                                            user_id: current_user.id, reviewer_role: reviewer_role, is_ultimate: 1)
        new_score.save!

        # 如果作品是未提交的状态则更新为已提交
        if @work.work_status == 0
          @work.work_status = 1
          @work.commit_time = Time.now
          @work.compelete_status = 1 if @homework.homework_type == "practice"
          # 分组作业更新分组id
          @work.group_id = @homework.max_group_id if @homework.homework_type == "group"
        end

        @work.ultimate_score = true
        @work.work_score = params[:score].to_f
        @work.save!

        Tiding.create!(user_id: @work.user_id, trigger_user_id: current_user.id, container_id: new_score.id,
                       container_type: "AdjustScore", parent_container_id: @homework.id,
                       parent_container_type: "HomeworkCommon", belong_container_id: @course.id,
                       belong_container_type: 'Course', tiding_type: "HomeworkCommon")

        normal_status(0,"调分成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  #添加评分的回复
  def add_score_reply
    tip_exception("回复内容不能为空") if params[:comment].blank?
    ActiveRecord::Base.transaction do
      begin
        score = @work.student_works_scores.find_by!(id: params[:score_id])
        jour = score.journals_for_messages.new(user_id: current_user.id, notes: params[:comment], reply_id: score.user_id)
        jour.save!
        normal_status(0,"回复成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 删除教师/教辅的评分记录
  def destroy_score
    score = @work.student_works_scores.find_by(id: params[:score_id])
    tip_exception("该评阅记录不存在") unless score.present?
    tip_exception("该评阅记录不能删除") unless score.allow_delete(current_user)
    begin
      score.destroy
      normal_status(0,"删除成功")
    rescue Exception => e
      uid_logger(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  # 对学生匿评进行申诉
  def appeal_anonymous_score
    tip_exception("申诉原因不能为空") if params[:comment].blank?
    score = @work.student_works_scores.find_by(id: params[:score_id].to_i)
    tip_exception("无法申诉") unless score.present? && @homework.appeal_duration &&
        score.reviewer_role == 3 && score.appeal_status == 0
    score_appeal = nil
    ActiveRecord::Base.transaction do
      begin
        score.update_attributes!(appeal_status: 1)
        score_appeal = StudentWorksScoresAppeal.create!(user_id: current_user.id, student_works_score_id: score.id,
                                                       comment: params[:comment], appeal_status: 1)

        normal_status(0,"提交成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
    # 提交后给老师和助教、匿评人发消息
    StudentWorkScoreAppealNotifyJob.perform_later(@course.id, score_appeal.id, current_user.id)
  end

  # 撤销申诉
  def cancel_appeal
    score = @work.student_works_scores.find_by(id: params[:score_id].to_i)
    if score.present? && score.appeal_status == 1
      ActiveRecord::Base.transaction do
        begin
          score.update_attributes!(appeal_status: 2)
          score_appeal = score.student_works_scores_appeal
          score_appeal.update_attributes!(appeal_status: 2)
          score_appeal.tidings.destroy_all
          normal_status(0,"撤销成功")
        rescue Exception => e
          uid_logger(e.message)
          tip_exception(e.message)
          raise ActiveRecord::Rollback
        end
      end
    else
      tip_exception("无法撤销")
    end
  end

  # status 3 接受   4 拒绝
  def deal_appeal_score
    tip_exception("缺少status参数") if params[:status].blank?
    tip_exception("status值不合要求") unless params[:status].to_i == 3 || params[:status].to_i == 4
    score = @work.student_works_scores.find_by(id: params[:score_id].to_i)
    if score.present? && score.appeal_status == 1
      ActiveRecord::Base.transaction do
        begin
          # 更新appeal_status的值
          score.update_attributes!(appeal_status: params[:status].to_i)
          score_appeal = score.student_works_scores_appeal
          score_appeal.update_attributes!(appeal_status: params[:status].to_i)
          score_appeal.tidings.update_all(status: 1)

          if params[:status].to_i == 3
            # 申诉成功后该评分失效
            score.update_attributes!(is_invalid: 1)

            # 申诉成功后 扣匿评学生的违规匿评扣分
            sw = @homework.student_works.find_by(user_id: score.user_id)
            sw.update_attributes!(appeal_penalty: @homework.homework_detail_manual.appeal_penalty + sw.appeal_penalty) if sw.present?

            # 申诉成功 重新计算申诉者的匿评分
            if @work.student_works_scores.where("reviewer_role = 3 AND appeal_status != 3").count > 0
              @work.student_score = score.stu_score(@work.id)
            else
              @work.student_score = nil
            end
            @work.save!
          end

          # todo tiding
          Tiding.create(user_id: score_appeal.user_id, trigger_user_id: current_user.id, container_id: score_appeal.id,
                        container_type: "StudentWorksScoresAppeal", parent_container_id: @work.id,
                        parent_container_type: 'UserAppealResult', belong_container_id: @course.id,
                        belong_container_type: "Course", viewed: 0, status: params[:status].to_i == 3 ? 1 : 2,
                        tiding_type: "HomeworkCommon")
          Tiding.create(user_id: score.user_id, trigger_user_id: current_user.id, container_id: score_appeal.id,
                        container_type: "StudentWorksScoresAppeal", parent_container_id: @work.id,
                        parent_container_type: 'AppealResult', belong_container_id: @course.id, belong_container_type: "Course",
                        viewed: 0, status: params[:status].to_i == 3 ? 1 : 2, tiding_type: "HomeworkCommon")

          normal_status(0,"提交成功")
        rescue Exception => e
          uid_logger(e.message)
          tip_exception(e.message)
          raise ActiveRecord::Rollback
        end
      end
    else
      tip_exception("该申诉不存在")
    end
  end

  # 查重作品调分
  def adjust_review_score
    tip_exception("缺少type参数") if params[:type].blank? || !["review", "report"].include?(params[:type])
    if params[:type] == "review" && (params[:score].blank? || params[:challenge_id].blank? || params[:code_rate].blank? || params[:copy_user_id].blank?)
      tip_exception("参数错误，score和challenge_id和code_rate和copy_user_id不能为空")
    elsif params[:type] == "report" && (params[:score].blank? || params[:challenge_id].blank?)
      tip_exception("参数错误，score和challenge_id不能为空")
    end
    challenge_setting = @homework.homework_challenge_settings.find_by(challenge_id: params[:challenge_id])
    if challenge_setting
      challenge = challenge_setting&.challenge
      tip_exception("不能小于零") if params[:score].to_i < 0
      tip_exception("不能大于关卡分值：#{challenge_setting.score}分") if challenge_setting && challenge_setting.score < params[:score].to_i

      ActiveRecord::Base.transaction do
        begin
          if params[:type] == "review"
            copy_user = User.find params[:copy_user_id]
            comment = "代码查重结果显示与#{copy_user.try(:show_real_name)}的代码相似度#{params[:code_rate]}%"
          else
            comment = "根据实训报告中最终提交的代码调整第#{challenge.position}关分数"
          end
          challenge_score = @work.challenge_work_scores.create!(challenge_id: params[:challenge_id], user_id: current_user.id, score: params[:score],
                                                               comment: comment)
          challenge_score.create_tiding current_user.id
          if @work.work_status != 0 && @work.myshixun
            games = @work.myshixun.games.where(challenge_id: @homework.homework_challenge_settings.pluck(:challenge_id))
            HomeworksService.new.update_myshixun_work_score @work, @work.myshixun, games, @homework, @homework.homework_challenge_settings
          else
            update_none_commit_work @work, @homework
          end
        rescue Exception => e
          uid_logger(e.message)
          tip_exception("调分失败")
          raise ActiveRecord::Rollback
        end
      end
    else
      tip_exception("该关卡不记分")
    end
  end


  private

  def find_homework
    begin
      @homework = HomeworkCommon.find params[:homework_common_id]
      @course = @homework.course
    rescue Exception => e
      uid_logger_error("##########{e.message}")
      missing_template
    end
  end

  def find_work
    begin
      @work = StudentWork.find params[:id]
      @homework = @work.homework_common
      @course = @homework.course
    rescue Exception => e
      uid_logger_error("##########{e.message}")
      missing_template
    end
  end

  def homework_public
    tip_exception(403,"没有操作权限") unless @user_course_identity <= Course::STUDENT ||
        (@course.is_public == 1 && @homework.is_public)
  end

  def course_student
    uid_logger("#########course-student")
    tip_exception(403,"没有操作权限") if @user_course_identity != Course::STUDENT
  end

  def my_work
    tip_exception(403,"没有操作权限") if @work.user_id != current_user.id || @work.work_status == 0
  end

  def edit_duration
    tip_exception("已过了修改时间") if @homework.end_time && @homework.end_time < Time.now
  end

  def end_or_late
    tip_exception("不在提交/更新阶段") if @homework.end_or_late
  end

  def des_params
    tip_exception("description参数不能为空") if params[:description].blank?
    params.require(:student_work).permit(:description)
  end

  def require_score_id
    tip_exception("score_id参数不能为空") if params[:score_id].blank?
  end

  # 是否匿评阶段
  def is_evaluation
    @is_author = @work.user_id == current_user.id
    @is_evaluation = @user_course_identity == Course::STUDENT && !@is_author && @homework.anonymous_comment &&
        [3, 4].include?(@homework.homework_detail_manual.comment_status)
  end

  # 作品是否公开
  def open_work
    tip_exception(403,"没有操作权限") unless (@user_course_identity < Course::STUDENT || current_user == @work.user || @homework.work_public || @is_evaluation)
  end

  def allow_add_score
    # 老师始终有评阅权限，匿评阶段内，学生对分配给该学生的作品有评阅权限
    tip_exception(403, "没有权限") unless allow_score(@homework, @user_course_identity, current_user.id, @work)
  end

  def update_check work
    tip_exception("作品描述不能为空") if params[:description].blank?
    if @homework.homework_type == "group"
      tip_exception("小组成员不能为空") if params[:user_ids].blank?
      tip_exception("小组成员人数不合要求") if params[:user_ids].length > @homework.homework_detail_group.max_num ||
          params[:user_ids].length < @homework.homework_detail_group.min_num
      tip_exception("请先关联项目") if @homework.homework_detail_group.base_on_project && work.project_id == 0
    end
  end


  def add_score_to_member student_work, homework, new_score
    student_works = homework.student_works.where("group_id = #{student_work.group_id} and id != #{student_work.id} and ultimate_score = 0")
    student_works.each do |st_work|
      st_score = StudentWorksScore.new(user_id: new_score.user_id, score: new_score.score,
                                       reviewer_role: new_score.reviewer_role, comment: new_score.comment)

      score = StudentWorksScore.where(user_id: new_score.user_id, student_work_id: st_work.id, reviewer_role: new_score.reviewer_role).last
      # 该用户的历史评阅无效
      score.update_column('is_invalid', true) if score.present? && score.score.present?
      st_work.student_works_scores << st_score

      if new_score.reviewer_role == 1
        st_work.teacher_score = new_score.score if new_score.score.present?
      elsif new_score.reviewer_role == 2
        if homework.homework_detail_manual.ta_mode == 1
          st_work.teaching_asistant_score = new_score.ta_score st_work.id
        else
          st_work.teaching_asistant_score = new_score.score if new_score.score.present?
        end
      else
        st_work.student_score = student_work.student_score
      end
      st_work.save!

      Tiding.create(user_id: st_work.user_id, trigger_user_id: current_user.id, container_id: st_score.id,
                    container_type: "StudentWorksScore", parent_container_id: st_work.id, parent_container_type: "StudentWork",
                    belong_container_id: homework.course_id, belong_container_type: "Course", viewed: 0,
                    tiding_type: "HomeworkCommon", extra: new_score.reviewer_role)

      new_score.attachments.each do |attachment|
        att = attachment.copy
        att.author_id = st_score.user_id
        st_score.attachments << att
      end
    end
  end

  def update_none_commit_work work, homework
    if work.work_status == 0
      work.work_status = 1
      work.compelete_status = 1
      work.commit_time = homework.end_time
      work.update_time = Time.now
    end
    final_score = 0
    homework.homework_challenge_settings.each do |cha_setting|
      adjust_score = work.challenge_work_scores.select{|work_score| work_score.challenge_id == cha_setting.challenge_id}.last
      final_score += adjust_score.score if adjust_score.present?
    end
    work.final_score = final_score
    work.work_score = final_score
    work.save!
  end
end
