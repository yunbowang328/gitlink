class Users::UpdateAccountService < ApplicationService

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    form = Users::UpdateAccountForm.new(params.merge(user: user))
    form.validate!

    first_full_reward = false
    ActiveRecord::Base.transaction do
      first_full_reward = user.nickname.blank?

      extension = user.user_extension || user.build_user_extension

      user.assign_attributes(user_attributes)
      extension.assign_attributes(user_extension_attributes)

      # 未认证下才能修改姓名
      if !user.authentication? && user.process_real_name_apply.blank?
        user.lastname  = params[:name]
        user.firstname = ''
        extension.gender = params[:gender]
      end

      if extension.student?
        extension.student_id      = params[:student_id]
        extension.technical_title = nil
      else
        extension.student_id      = nil
        extension.technical_title = params[:technical_title]
      end

      # 职业、学校变动需要重新进行职业认证
      if extension.identity_changed? || extension.school_id_changed?
        user.professional_certification = false
        # 撤销之前的职业认证
        user.apply_user_authentication.professional_auth.passed.update_all(status: 3)
      end

      # 表示资料完整
      # user.profile_completed = true

      extension.save!
      user.save!
    end

    if first_full_reward
      # RewardGradeService.call(user, container_id: user.id, container_type: 'Account', score: 500)
      if user.user_extension.teacher?
        join_course(user.id,1309, 2)
        # sms_notify_admin(user.lastname)
      end
    end

    user
  end

  private

  def user_attributes
    params.slice(*%i[nickname show_realname])
  end

  def user_extension_attributes
    params.slice(*%i[location location_city identity student_id technical_title school_id department_id])
  end

  def sms_notify_admin name
    Gitlink::Sms.send(mobile:'17680641960', send_type:'teacher_register', name: name, user_name:'管理员')
  rescue => ex
    Util.logger_error(ex)
  end

  def join_course(user_id, course_id, identity)
    course = Course.find_by(id: course_id)
    return unless course
    attr = {course_id: course_id, role: identity, user_id: user_id}
    CourseMember.create!(attr)
  end
end