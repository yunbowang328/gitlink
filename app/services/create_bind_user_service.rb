class CreateBindUserService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    raise Error, '系统错误' if open_user.blank?
    raise Error, '系统错误' unless can_bind_user?

    if params[:not_bind].to_s == 'true'
      clear_can_bind_user_flag
      return user
    end

    bind_user = User.try_to_login(params[:username], params[:password])
    raise Error, '用户名或者密码错误' if bind_user.blank?
    raise Error, '用户名或者密码错误' unless bind_user.check_password?(params[:password].to_s)
    raise Error, '该账号已被绑定，请更换其他账号进行绑定' if bind_user.bind_open_user?(params[:type].to_s)

    ActiveRecord::Base.transaction do
      open_user.user_id = bind_user.id
      open_user.save!

      user.user_extension.delete
      user.delete
    end

    clear_can_bind_user_flag

    bind_user
  end

  private

  def open_user
    @_open_user ||= begin
      case params[:type].to_s
      when 'wechat' then user.wechat_open_user
      when 'qq' then user.qq_open_user
      end
    end
  end

  def can_bind_user?
    Rails.cache.read(open_user.can_bind_cache_key).present?
  end

  def clear_can_bind_user_flag
    Rails.cache.delete(open_user.can_bind_cache_key)
  end
end