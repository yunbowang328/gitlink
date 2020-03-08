class Users::UpdatePasswordService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    Users::UpdatePasswordForm.new(params).validate!

    raise Error, '旧密码不匹配' unless user.check_password?(params[:old_password]) || user.hashed_password.blank?

    ActiveRecord::Base.transaction do
      user.update!(password: params[:password])

      if user.gid.present?
        # 同步修改gitlab密码
        begin
          Gitlab.client.edit_user(user.gid, password: params[:password])
        rescue Exception => ex
          Rails.logger.error(ex.message)
          raise Error, '修改失败'
        end
      end
    end

    user
  end
end