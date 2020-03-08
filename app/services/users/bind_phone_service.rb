class Users::BindPhoneService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    Users::BindPhoneForm.new(params).validate!

    raise Error, '该手机号已被其他账号绑定' if User.where.not(id: user.id).exists?(phone: params[:phone])

    code = VerificationCode.where(phone: params[:phone], code: params[:code], code_type: 4).last
    raise Error, '验证码无效' unless code&.effective?

    ActiveRecord::Base.transaction do
      if user.phone.blank?
        RewardGradeService.call(user, container_id: user.id, container_type: 'Phone', score: 500)
      end

      user.phone = params[:phone]
      user.save!
    end
  end
end