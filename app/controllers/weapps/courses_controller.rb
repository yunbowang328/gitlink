class Weapps::CoursesController < Weapps::BaseController
  before_action :require_login
  before_action :set_course, except: [:create, :check_invite_code]
  before_action :user_course_identity, except: [:basic_info, :create, :check_invite_code]
  before_action :check_account, only: [:create, :check_invite_code]
  before_action :teacher_allowed, only: [:edit, :update]
  before_action :teacher_or_admin_allowed, only: [:change_member_roles, :delete_course_teachers]

  def course_activities
    @course = current_course
    homework_commons = @course.homework_commons.where(homework_type: ["practice", "normal"]).homework_published
    member = @course.course_members.find_by(user_id: current_user.id, is_active: 1)
    if (@user_course_identity == Course::STUDENT && member.try(:course_group_id).to_i == 0) || @user_course_identity > Course::STUDENT
      homework_commons = homework_commons.unified_setting
    elsif @user_course_identity == Course::STUDENT
      not_homework_ids = @course.homework_group_settings.none_published.where("course_group_id = #{member.try(:course_group_id)}").pluck(:homework_common_id)
      homework_commons = homework_commons.where.not(id: not_homework_ids)
    end
    homework_ids = homework_commons.blank? ? "(-1)" : "(" + homework_commons.pluck(:id).join(",") + ")"

    activities = @course.course_activities.where("course_act_type in ('Course', 'CourseMessage') or
                  (course_act_type = 'HomeworkCommon' and course_act_id in #{homework_ids})").order("id desc")
    @activities = paginate activities.includes(:course_act, user: :user_extension)
  end

  def create
    # return render_error("只有老师身份才能创建课堂") unless current_user.is_teacher?
    course = Course.new(tea_id: current_user.id)
    Weapps::CreateCourseService.call(course, course_params)
    render_ok(id: course.id)

  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def basic_info
    @course = current_course
  end

  def edit
    @course = current_course
  end

  def update
    course = Weapps::UpdateCourseService.call(current_course, update_course_params)
    render_ok(id: course.id)
  end

  def show
    @course = current_course
    @current_user = current_user
  end

  def shixun_homework_category
    @categories = current_course.shixun_course_modules.first&.course_second_categories
  end

  def check_invite_code
    tip_exception(-1, "邀请码不能为空") if params[:invite_code].blank?
    invite_code = params[:invite_code]
    course = Course.find_by(invite_code: invite_code, is_delete: 0, invite_code_halt: 0)
    course_group = CourseGroup.find_by(invite_code: invite_code, invite_code_halt: 0)
    if course.blank?
      tip_exception(-1, "邀请码无效") if course_group.blank?

      course = Course.find_by(id: course_group.course_id, is_delete: 0)
      tip_exception(-1, "邀请码无效") if course.blank?
    end

    tip_exception(-1, "课堂已结束，无法加入") if course.is_end

    render_ok
  end

  # 教师列表
  def teachers
    @course = current_course
    @page = (params[:page] || 1).to_i
    @limit = (params[:limit] || 20).to_i
    search = params[:search].present? ? params[:search].strip : ""
    if @course.try(:id) != 1309 || current_user.admin_or_business? || current_user.try(:id) == 15582
      @teacher_list = @course.course_members.joins(:user).where("course_members.role in (1, 2, 3)")
    else
      @teacher_list = @course.course_members.joins(:user).where("(course_members.role in (1, 3) or (course_members.user_id = #{current_user.id}
                                          and course_members.role = 2))")
    end

    if search.present?
      @teacher_list = @teacher_list.joins(:user).where("LOWER(CONCAT(users.lastname, users.firstname)) like ?", "%#{search}%")
    end

    @teacher_list_size = @teacher_list.size

    @applications_size = CourseMessage.unhandled_join_course_requests_by_course(@course).size

    @teacher_list = @teacher_list.includes(user: [user_extension: :school])
    # 中英文混合排序（忽略大小写）
    @teacher_list = @teacher_list.sort {|x, y| Pinyin.t(x.user&.real_name, splitter: '').upcase <=> Pinyin.t(y.user&.real_name, splitter: '').upcase}
    @teacher_list = @teacher_list[(@page-1)*@limit ... @page*@limit]
  end

  # 批量删除教师或助教
  def delete_course_teachers
    begin
      @course = current_course
      @page = (params[:page] || 1).to_i
      @limit = (params[:limit] || 20).to_i
      course_members = @course.course_members.where(id: params[:course_member_ids], role: %i[PROFESSOR ASSISTANT_PROFESSOR])
      user_ids = course_members.pluck(:user_id)
      course_members.destroy_all
      CourseDeleteStudentNotifyJob.perform_later(@course.id, user_ids, current_user.id)
      @course.students.where(user_id: user_ids).update_all(is_active: 1)
      normal_status(0, "删除成功")
    rescue => e
      uid_logger_error(e.message)
      tip_exception("删除失败")
    end
  end

  def students
    @course = current_course
    @page = (params[:page] || 1).to_i
    @limit = (params[:limit] || 20).to_i
    search = params[:search].present? ? params[:search].strip : nil
    course_group_id = params[:course_group_id].present? ? params[:course_group_id].to_i : nil

    @students = CourseMember.students(@course)

    if search.present?
      @students = @students.joins(user: :user_extension).where("LOWER(CONCAT(users.lastname, users.firstname)) like ? or
                                                        user_extensions.student_id like ?", "%#{search}%", "%#{search}%")
    end

    if course_group_id.present?
      @course_group = CourseGroup.find(course_group_id) if course_group_id != 0
      @students = @students.where(course_group_id: @course_group&.id.to_i)
    end

    @students_count = @students.size
    @students = @students.includes(user: :user_extension)
    # 中英文混合排序（忽略大小写）
    @students = @students.sort {|x, y| Pinyin.t(x.user&.real_name, splitter: '').upcase <=> Pinyin.t(y.user&.real_name, splitter: '').upcase}
    @students = @students[(@page-1)*@limit ... @page*@limit]
  end

  # 批量修改角色
  def change_member_roles
    @course = current_course
    tip_exception("请至少选择一个角色") if params[:roles].reject(&:blank?).blank?
    tip_exception("教师、助教角色只能二选一") if params[:roles].include?("PROFESSOR") && params[:roles].include?("ASSISTANT_PROFESSOR")

    params[:user_ids].each do |user_id|
      course_members = @course.course_members.where(user_id: user_id)
      tip_exception("非课堂成员不能修改角色") if course_members.blank?

      ActiveRecord::Base.transaction do
        # 第一次修改为教师或助教身份时直接创建数据
        if params[:roles].include?("CREATOR")
          teacher_member = course_members.where(role: %i[CREATOR]).take
        elsif (params[:roles].include?("PROFESSOR") || params[:roles].include?("ASSISTANT_PROFESSOR")) && !course_members.exists?(role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
          teacher_member = CourseMember.create!(course_id: @course.id, user_id: user_id, role: params[:roles].include?("PROFESSOR") ? 2 : 3)
          # 如果有未审批的申请教师/助教的记录，则修改状态为已审批
          apply_teacher = CourseMessage.where(course_id: @course.id, course_message_id: user_id, status: 0).last
          apply_teacher.update!(status: 1, apply_user_id: current_user.id) if apply_teacher
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
          correspond_teacher_exist = CourseMember.exists?(user_id: user_id, is_active: 1, course_id: @course.id, role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
          new_student = CourseMember.new(user_id: user_id, course_id: @course.id, role: 4)
          new_student.is_active = 0 if correspond_teacher_exist
          new_student.save!

          CourseAddStudentCreateWorksJob.perform_later(@course.id, [user_id])
          # StudentJoinCourseNotifyJob.perform_later(current_user.id, course.id)
        elsif !params[:roles].include?("STUDENT") && student_member.present?
          # 删除学生身份时激活老师身份
          teacher_member.update_attributes!(is_active: 1) if student_member.is_active && teacher_member.present?
          student_member.destroy!
          CourseDeleteStudentDeleteWorksJob.perform_later(@course.id, [user_id])
          # CourseDeleteStudentNotifyJob.perform_later(@course.id, [params[:user_id]], current_user.id)
        elsif params[:roles].include?("STUDENT") && student_member.present? && !params[:roles].include?("PROFESSOR") && !params[:roles].include?("ASSISTANT_PROFESSOR")
          # 学生身份存在且学生没有教师身份时更新is_active
          student_member.update_attributes!(is_active: 1)
        end
      end
    end
    normal_status(0, "修改成功")
  end

  # 分班列表
  def course_groups
    @course_groups = @course.course_groups
    @course_groups = @course_groups.where("name like ?", "%#{params[:search]}%") unless params[:search].blank?
    @all_group_count = @course_groups.size
    @teachers = @course.teachers.includes(:user, :teacher_course_groups) if @user_course_identity < Course::NORMAL
    @current_group_id = @course.students.where(user_id: current_user.id).take&.course_group_id if @user_course_identity == Course::STUDENT
  end

  private

  def course_params
    params.permit(:name, :course_list_name, :credit, :end_date, course_module_types: [])
  end

  def update_course_params
    params.permit(:name, :course_list_name, :credit, :end_date)
  end

  def current_course
    @_current_course = Course.find params[:id]
  end

  def teacher_allowed
    return render_forbidden unless @user_course_identity < Course::STUDENT
  end

  # 课堂教师，课堂管理员以及超级管理员的权限判断
  def teacher_or_admin_allowed
    unless @user_course_identity < Course::ASSISTANT_PROFESSOR
      tip_exception(403, "..")
    end
  end

  def set_course
    @course = Course.find_by!(id: params[:id])
    tip_exception(404, "") if @course.is_delete == 1 && !current_user.admin_or_business?
  end
end