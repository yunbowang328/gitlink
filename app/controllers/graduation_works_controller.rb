class GraduationWorksController < ApplicationController
  before_action :require_login, :check_auth
  before_action :find_task, only: [:new, :create, :search_member_list, :check_project, :relate_project,
                                   :cancel_relate_project, :delete_work]
  before_action :find_work, only: [:show, :edit, :update, :revise_attachment, :supply_attachments, :comment_list,
                                   :add_score, :delete_score, :adjust_score, :assign_teacher]
  before_action :user_course_identity
  before_action :task_public
  before_action :teacher_allowed, only: [:add_score, :adjust_score, :assign_teacher]
  before_action :course_student, only: [:new, :create, :edit, :update, :search_member_list, :relate_project,
                                        :cancel_relate_project, :delete_work]
  before_action :my_work, only: [:edit, :update, :revise_attachment]
  before_action :published_task, only: [:new, :create, :edit, :update, :search_member_list, :relate_project,
                                        :cancel_relate_project, :revise_attachment]
  before_action :edit_duration, only: [:edit, :update, :delete_work]
  before_action :open_work, only: [:show, :supply_attachments, :comment_list]

  def new
    if @task.task_type == 2 && @task.base_on_project
      work = @task.graduation_works.where(user_id: current_user.id).first
      if work.present? && (work.work_status != 0 || work.project_id == 0)
        normal_status(403, "")
      end
    end
    @user = current_user
  end

  # 搜索课堂学生
  def search_member_list
    unless params[:search].blank?
      # 有搜索条件时搜索课堂所有学生包括已提交的
      users = User.joins(:graduation_works).where("concat(users.lastname, users.firstname) like ? and
                                                 graduation_task_id = #{@task.id}", "%#{params[:search]}%")
      user_ids = users.pluck(:id) - [current_user.id]
      @members = @course.students.where(user_id: user_ids)
    else

      # 没有搜索条件时搜索课堂所有未提交的学生
      user_ids = @task.graduation_works.where("work_status = 0").pluck(:user_id) - [current_user.id]
      @members = @course.students.where(user_id: user_ids)
    end

    page = params[:page] ? params[:page].to_i : 1
    limit = params[:limit] ? params[:limit].to_i : 10

    # todo user_extension
    @members = @members.page(page).per(limit).includes(:course_group, user: :user_extension)
  end

  def delete_work
    ActiveRecord::Base.transaction do
      begin
        work = @task.graduation_works.find_by!(user_id: params[:user_id])
        tip_exception("只有组长才能删除组员") if work.commit_user_id != current_user.id
        work.update!(description: nil, project_id: 0, late_penalty: 0, work_status: 0, commit_time: nil,
                               update_time: nil, group_id: 0, commit_user_id: nil, final_score: nil, work_score: nil,
                               teacher_score: nil, teaching_asistant_score: nil, update_user_id: nil)
        work.attachments.destroy_all
        work.tidings.destroy_all
        normal_status("删除成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
      end
    end
  end

  # 判断项目是否已有其他作品关联上了
  def check_project
    tip_exception("项目id不能为空") if params[:project_id].blank?
    work = @task.graduation_works.where(project_id: params[:project_id]).first
    @is_relate = work.present?
    @relate_user = work.present? ? work.user.real_name : ""
  end

  def relate_project
    tip_exception("项目id不能为空") if params[:project_id].blank?

    ActiveRecord::Base.transaction do
      begin
        # 判断项目是否存在且当前用户是项目管理员
        project = Project.where(id: params[:project_id]).first
        member = Member.where(project_id: project.try(:id), user_id: current_user.id).first

        if project.present? && member.present? && member.member_roles.first.try(:role_id) == 3


          work = @task.graduation_works.where("user_id = #{current_user.id}").first ||
              GraduationWork.create(user_id: current_user.id, graduation_task_id: @task.id, course_id: @task.course_id)

          if work.work_status == 0 && work.project_id == 0
            work.update!(project_id: project.id, update_time: Time.now)

            # 将老师加入项目
            project_member = project.members.where(user_id: @task.user_id).first
            if project_member.present?
              project_member.member_roles.first.update!(role_id: 3) if project_member.member_roles.first.present?
            else
              member = Member.create(user_id: @task.user_id, project_id: project.id)
              member.member_roles << MemberRole.new(role_id: 3)
              Tiding.create(user_id: @task.user_id, trigger_user_id: current_user.id, container_id: project.id,
                            container_type: 'ManagerJoinProject', belong_container_id: project.id,
                            belong_container_type: "Project", tiding_type: "System", extra: 3)
            end
            normal_status("关联成功")
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
    work = @task.graduation_works.where(user_id: current_user.id, work_status: 0).first
    if work.present? && work.project.present?
      ActiveRecord::Base.transaction do
        begin
          member = work.project.members.where(user_id: @task.user_id).first
          member.destroy if member.present?
          Tiding.where(user_id: @task.user_id, trigger_user_id: current_user.id, container_id: work.project.id,
                       container_type: 'ManagerJoinProject').destroy_all

          work.update!(project_id: 0)
          normal_status("取消关联成功")

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

  def create
    graduation_work = @task.graduation_works.where(user_id: current_user.id).first ||
        GraduationWork.create(user_id: current_user.id, graduation_task_id: @task.id, course_id: @task.course_id)

    update_check graduation_work

    tip_exception("作业不可重复提交") if graduation_work.work_status != 0
    tip_exception("已过了提交时间") if @course.is_end || (@task.end_time < Time.now && (!@task.allow_late ||
        (@task.late_time.present? && @task.late_time < Time.now)))

    student_ids = [current_user.id]
    ActiveRecord::Base.transaction do
      begin
        # work.update_attributes(graduation_work_params)

        graduation_work.description = params[:description]
        graduation_work.commit_time = Time.now
        graduation_work.update_time = Time.now
        graduation_work.commit_user_id = current_user.id
        graduation_work.update_user_id = current_user.id
        graduation_work.course_id = @course.id
        graduation_work.group_id = @task.task_type == 2 ? @task.graduation_works.where("work_status != 0").map(&:group_id).max.to_i + 1 : 0

        #提交作品时，计算是否迟交
        graduation_work.late_penalty = @task.end_time < Time.now.to_s ? @task.late_penalty : 0
        graduation_work.work_status = @task.end_time < Time.now.to_s ? 2 : 1

        if graduation_work.save!
          Attachment.associate_container(params[:attachment_ids], graduation_work.id, graduation_work.class)

          if @task.task_type == 2
            members = (params[:user_ids] || []).collect(&:to_i) - [current_user.id]
            members = @course.students.pluck(:user_id) & members
            student_ids += members
            for i in 0 .. members.count-1
              stu_work = @task.graduation_works.where(user_id: members[i].to_i).first || GraduationWork.new
              stu_work.update!(user_id: members[i].to_i, description: graduation_work.description,
                                         graduation_task_id: @task.id, project_id: graduation_work.project_id,
                                         late_penalty: graduation_work.late_penalty, work_status: graduation_work.work_status,
                                         commit_time: Time.now, update_time: Time.now, group_id: graduation_work.group_id,
                                         commit_user_id: current_user.id, update_user_id: current_user.id)
              stu_work.save!
              graduation_work.attachments.each do |attachment|
                att = attachment.copy
                att.author_id = attachment.author_id
                stu_work.attachments << att
              end
            end
          end
          @task.update_column(:updated_at, Time.now)
          # todo 更新对应的毕设任务课堂动态
          # update_course_activity(@taskhomework.class,@task.id)
          @work_id = graduation_work.id
        end

      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end

      SubmitGraduationWorkNotifyJob.perform_later(@task.id, student_ids)
    end
  end

  def edit
    @task_user = current_user
    if @task.task_type == 2
      @commit_user_id = @work.commit_user_id
      @work_members = @course.students.where(user_id: @task.graduation_works.where(group_id: @work.group_id).pluck(:user_id)).
          order("course_members.id=#{@work.commit_user_id} desc").includes(:course_group, user: :user_extension)
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
          if @task.task_type == 2
            graduation_works = @task.graduation_works.where("group_id = #{@work.group_id} and user_id != #{@work.user_id}")
            work_user_ids = graduation_works.pluck(:user_id)
            params_user_ids = (params[:user_ids] || []).collect(&:to_i) - [@work.user_id]
            params_user_ids = @course.students.pluck(:user_id) & params_user_ids

            # 原成员更新描述、更新时间以及附件
            @task.graduation_works.where(group_id: @work.group_id, user_id: (work_user_ids & params_user_ids)).each do |work|
              work.update!(update_time: Time.now, description: @work.description, update_user_id: current_user.id)
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
            @task.graduation_works.where(group_id: @work.group_id, user_id: delete_user_ids).each do |work|
              work.attachments.destroy_all
              # work.student_works_scores.destroy_all
              work.tidings.destroy_all
            end
            @task.graduation_works.where(group_id: @work.group_id, user_id: delete_user_ids).
                update_all(work_status: 0, description: nil, late_penalty: 0, commit_time: nil, update_time: nil,
                           final_score: nil, teacher_score: nil, work_score: nil, project_id: 0, group_id: 0,
                           commit_user_id: nil, update_user_id: nil)

            # 新增加的成员
            (params_user_ids - work_user_ids).each do |user_id|
              stu_work = @task.graduation_works.where(user_id: user_id).empty? ? GraduationWork.new :
                             @task.graduation_works.where(user_id: user_id).first
              stu_work.update!(user_id: user_id, description: @work.description, graduation_task_id: @task.id,
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

          normal_status("更新成功")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end

      SubmitGraduationWorkNotifyJob.perform_later(@task.id, student_ids) if student_ids.present?
    end
  end

  def show
    @current_user = current_user
    @is_author = @work.user_id == current_user.id
    @work_members = @task.task_type == 1 ? [] : @task.graduation_works.where.not(user_id: @work.user_id).
        where(group_id: @work.group_id).includes(:user)
    @attachments = @work.attachments.where("attachtype != 7 or attachtype is null")
  end

  def comment_list
    @current_user = current_user
    @last_comment = @work.graduation_work_scores.where(user_id: @current_user.id).last
    @comment_scores = @work.graduation_work_scores.reorder("created_at desc").includes(:user)
  end

  # 给作品评分
  def add_score
    tip_exception("该学生的分数已经过调整，不能再评阅") if @work.ultimate_score
    tip_exception("分数和评语不能都为空") if params[:score].blank? && params[:comment].blank?
    tip_exception("分数不能超过0-100") if params[:score] && (params[:score].to_f < 0 || params[:score].to_f > 100)

    ActiveRecord::Base.transaction do
      begin
        # 没传score则取上次评分成绩
        score = GraduationWorkScore.where(user_id: current_user.id, graduation_work_id: @work.id).last
        new_score = GraduationWorkScore.new
        new_score.score = params[:score].blank? ? score.try(:score) : params[:score].to_f
        new_score.comment = params[:comment] if params[:comment] && params[:comment].strip != ""
        new_score.user_id = current_user.id
        new_score.graduation_work_id = @work.id
        new_score.graduation_task_id = @task.id

        # 如果作品是未提交的状态则更新为已提交
        if !new_score.score.nil? && @work.work_status == 0
          @work.update!(work_status: 1, commit_time: Time.now)
          if @task.task_type == 2
            @work.update!(group_id: @task.graduation_works.where("work_status != 0").select("distinct group_id").count + 1)
          end
        end

        if @task.cross_comment && @work.graduation_work_comment_assignations.where(user_id: current_user.id).count > 0
          new_score.reviewer_role = 2
        else
          new_score.reviewer_role = 1
        end

        if new_score.save!
          Attachment.associate_container(params[:attachment_ids], new_score.id, new_score.class)

          # 该用户的历史评阅无效
          score.update_column('is_invalid', true) if score.present? && score.score.present?

          Tiding.create(user_id: @work.user_id, trigger_user_id: User.current.id, container_id: new_score.id,
                        container_type: "GraduationWorkScore", parent_container_id: @work.id,
                        parent_container_type: "GraduationWork", belong_container_id: @task.course_id,
                        belong_container_type: "Course", viewed: 0, tiding_type: "GraduationTask", extra: new_score.reviewer_role)

          case new_score.reviewer_role
          when 1 #教师评分取平均分
            ts_score = GraduationWorkScore.find_by_sql("SELECT AVG(score) AS score FROM graduation_work_scores WHERE
                            graduation_work_id = #{@work.id} AND reviewer_role = 1 AND score IS NOT NULL AND is_invalid = 0")

            @work.teacher_score = ts_score.first.score.nil? ? nil : ts_score.first.score.try(:round, 2).to_f

            # 分组作业整组同评
            if @task.task_type == 2 && params[:same_score]
              add_graduation_score_to_member @work, @task, new_score
            end

          when 2 #交叉评分显示平均分
            ts_score = GraduationWorkScore.find_by_sql("SELECT AVG(score) AS score FROM graduation_work_scores WHERE
                            graduation_work_id = #{@work.id} AND reviewer_role = 2 AND score IS NOT NULL AND is_invalid = 0")
            @work.cross_score = ts_score.first.score.nil? ? nil : ts_score.first.score.try(:round, 2).to_f
          end

          @task.update_column('updated_at', Time.now)
          # update_course_activity(@task.class, @task.id)
          @work.save!

          normal_status("提交成功")
        end
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  def adjust_score
    tip_exception("成绩不能为空") if params[:score].blank?
    tip_exception("成绩不能小于零") if params[:score].to_f < 0
    tip_exception("成绩不能大于100") if params[:score].to_f.round(1) > 100
    tip_exception("调分原因不能超过100个字符") if params[:comment].present? && params[:comment].length > 100
    ActiveRecord::Base.transaction do
      begin
        # 分数不为空的历史评阅都置为失效
        @work.graduation_work_scores.where.not(score: nil).update_all(is_invalid: 1)

        new_score = GraduationWorkScore.new(graduation_work_id: @work.id, score: params[:score].to_f,
                                            graduation_task_id: @task.id, comment: "使用调分功能调整了作业最终成绩：#{params[:comment]}",
                                            user_id: User.current.id, reviewer_role: 1, is_ultimate: 1)
        new_score.save!
        @work.update!(ultimate_score: 1, work_score: params[:score].to_f)

        Tiding.create!(user_id: @work.user_id, trigger_user_id: current_user.id, container_id: new_score.id,
                       container_type: "AdjustScore", parent_container_id: @task.id,
                       parent_container_type: "GraduationTask", belong_container_id: @course.id,
                       belong_container_type: 'Course', tiding_type: "GraduationTask")

        normal_status("调分成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 删除教师/教辅的评分记录
  def delete_score
    score = @work.graduation_work_scores.where(id: params[:comment_id]).first
    if score.present? && (score.is_invalid || score.score.nil?) && (score.user == current_user || current_user.admin_or_business?)
      begin
        score.destroy
        normal_status("删除成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    else
      tip_exception("无法删除")
    end
  end

  def supply_attachments
    @revise_attachments = @work.attachments.where(attachtype: 7)
    @last_atta = @revise_attachments.last
  end

  def revise_attachment
    tip_exception("不在补交阶段内") if @course.is_end || @task.end_time > Time.now || !@task.allow_late ||
        (@task.late_time && @task.late_time < Time.now)
    tip_exception("附件参数有误") if params[:attachment_ids].blank? || !params[:attachment_ids].is_a?(Array)
    tip_exception("补交附件原因不能为空") if params[:description].blank?

    ActiveRecord::Base.transaction do
      begin
        revise_attachment = @work.attachments.where(attachtype: 7).reorder("created_on desc").last
        if revise_attachment.present? && @work.graduation_work_scores.where("created_at > '#{revise_attachment.created_on}'
                                                                         and score is not null").count == 0
          revise_attachment.destroy
        end
        Attachment.associate_container(params[:attachment_ids], @work.id, @work.class, 7)
        revise_attachment = Attachment.where(attachtype: 7, container_id: @work.id, container_type: "GraduationWork").last
        revise_attachment.update!(description: params[:description]) if revise_attachment.present?

        @work.update!(update_time: Time.now)

        normal_status("提交成功")
      rescue Exception => e
        uid_logger(e.message)
        tip_exception(e.message)
        raise ActiveRecord::Rollback
      end
    end
  end

  # 交叉评阅分配老师
  def assign_teacher
    tip_exception(-1, "user_id不能为空") if params[:user_id].nil?
    @work_assign_teacher = @work.graduation_work_comment_assignations.find_by(user_id: params[:user_id])

    if @work_assign_teacher.present?
      # graduation_group_id: 已经是答辩组的需要 将答辩组清空
      @work_assign_teacher.update!(graduation_group_id: 0)
    else
      @work.graduation_work_comment_assignations << GraduationWorkCommentAssignation.new(graduation_task_id: @task.id,
                                                                                         user_id: params[:user_id],
                                                                                         graduation_group_id: 0)
    end
    normal_status("分配成功")
  end

  private
  def find_task
    begin
      @task = GraduationTask.find(params[:graduation_task_id])
      @course = @task.course
    rescue Exception => e
      uid_logger(e.message)
      tip_exception("id不存在")
    end
  end

  def find_work
    begin
      @work = GraduationWork.find(params[:id])
      @task = @work.graduation_task
      @course = @task.course
    rescue Exception => e
      uid_logger(e.message)
      tip_exception("id不存在")
    end
  end

  def task_public
    tip_exception(403,"没有操作权限") if @user_course_identity > Course::STUDENT && (@course.is_public == 0 ||
                                                      (@course.is_public == 1 && !@task.is_public))
  end

  def course_student
    tip_exception(403,"没有操作权限") if @user_course_identity != Course::STUDENT
  end

  def my_work
    tip_exception(403,"没有操作权限") if @work.user_id != current_user.id || @work.work_status == 0
  end

  def published_task
    tip_exception("不能在非提交时间内操作") if @task.status == 0 || (!@task.allow_late && @task.status > 1) ||
        (@task.allow_late && @task.late_time && @task.late_time < Time.now)
  end

  def edit_duration
    tip_exception("已过了修改时间") if @task.end_time && @task.end_time < Time.now
  end

  # 作品是否公开
  def open_work
    tip_exception(403,"没有操作权限") unless (@user_course_identity < Course::STUDENT || current_user == @work.user || @task.open_work)
  end

  def update_check work
    tip_exception("作品描述不能为空") if params[:description].blank?
    if @task.task_type == 2
      tip_exception("小组成员不能为空") if params[:user_ids].blank?
      tip_exception("小组成员人数不合要求") if params[:user_ids].length > @task.max_num || params[:user_ids].length < @task.min_num
      tip_exception("请先关联项目") if @task.base_on_project && work.project_id == 0
    end
  end

  def graduation_work_params
    params.require(:graduation_work).permit(:description)
  end

  def add_graduation_score_to_member work, task, new_score
    graduation_works = task.graduation_works.where("group_id = #{work.group_id} and id != #{work.id} and ultimate_score = 0")
    graduation_works.each do |st_work|
      st_score = GraduationWorkScore.new(user_id: new_score.user_id, score: new_score.score,
                                         reviewer_role: new_score.reviewer_role, comment: new_score.comment)
      st_work.graduation_work_scores << st_score

      score = GraduationWorkScore.where(user_id: new_score.user_id, graduation_work_id: st_work.id).last
      # 该用户的历史评阅无效
      score.update_column('is_invalid', true) if score.present? && score.score.present?

      teacher_score = GraduationWorkScore.find_by_sql("SELECT AVG(score) AS score FROM graduation_work_scores WHERE
                            graduation_work_id = #{work.id} AND reviewer_role = 1 AND score IS NOT NULL AND is_invalid = 0")

      st_work.teacher_score = teacher_score.first.score.nil? ? nil : teacher_score.first.score.try(:round, 2).to_f
      st_work.save!

      Tiding.create(user_id: st_work.user_id, trigger_user_id: User.current.id, container_id: st_score.id,
                    container_type: "GraduationWorkScore", parent_container_id: st_work.id,
                    parent_container_type: "GraduationWork", belong_container_id: task.course_id,
                    belong_container_type: "Course", viewed: 0, tiding_type: "GraduationTask", extra: st_score.reviewer_role)
      # 评阅附件的复制
      new_score.attachments.each do |attachment|
        att = attachment.copy
        att.author_id = st_score.user_id
        st_score.attachments << att
      end
    end
  end
end
