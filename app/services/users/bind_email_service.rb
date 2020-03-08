class Users::BindEmailService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    Users::BindEmailForm.new(params).validate!

    raise Error, '该邮箱已被其他账号绑定' if User.where.not(id: user.id).exists?(mail: params[:email])

    code = VerificationCode.where(email: params[:email], code: params[:code], code_type: 5).last
    raise Error, '验证码无效' unless code&.effective?

    ActiveRecord::Base.transaction do
      if user.mail.blank?
        RewardGradeService.call(user, container_id: user.id, container_type: 'Mail', score: 500)
      end

      user.mail = params[:email]
      user.save!
    end
  end
end