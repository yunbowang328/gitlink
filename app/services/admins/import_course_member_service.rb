class Admins::ImportCourseMemberService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :file, :result

  def initialize(file)
    @file   = file
    @result = { success: 0, fail: [] }
  end

  def call
    raise Error, '文件不存在' if file.blank?

    excel = Admins::ImportCourseMemberExcel.new(file)
    excel.read_each(&method(:create_course_member))

    result
  rescue ApplicationImport::Error => ex
    raise Error, ex.message
  end

  private

  def create_course_member(data)
    raise '课堂角色必须为 2、3、4' unless [2, 3, 4].include?(data.role.to_i)

    user = User.joins(:user_extension).where(user_extensions: { student_id: data.student_id, school_id: data.school_id }).first
    raise '该学号的用户不存在' if user.blank?
    course = Course.find_by(id: data.course_id)
    raise '该课堂不存在' if course.blank?

    course_group = nil
    if data.course_group_name.present?
      course_group = course.course_groups.find_or_create_by!(name: data.course_group_name)
    end

    member = course.course_members.find_by(user_id: user.id, role: data.role.to_i)
    # 如果已是课堂成员且是学生身份and不在指定的分班则移动到该分班
    if member.present? && member.role == 'STUDENT' && course_group && member.course_group_id != course_group&.id.to_i
      member.update!(course_group_id: course_group&.id.to_i)
    elsif member.blank?
      course.course_members.create!(user_id: user.id, role: data.role.to_i, course_group_id: course_group&.id.to_i)
      extra =
        case data.role.to_i
        when 2 then 9
        when 3 then 7
        else 10
        end

      Tiding.create!(user_id: user.id, trigger_user_id: course.tea_id, container_id: course.id,
                     container_type: 'TeacherJoinCourse', belong_container_id: course.id,
                     belong_container_type: 'Course', tiding_type: 'System', extra: extra)
    end

    result[:success] += 1
  rescue Exception => ex
    fail_data = data.as_json
    fail_data[:data] = fail_data.values.join(',')
    fail_data[:message] = ex.message

    result[:fail] << fail_data
  end
end