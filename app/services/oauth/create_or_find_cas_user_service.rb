class Oauth::CreateORFindCasUserService < ApplicationService

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    return [@user, false] if @user

    open_user = OpenUsers::Cas.find_or_initialize_by(uid: @params['user']) do |u|
      u.extra = @params
    end

    return [open_user.user, false] if open_user.persisted?

    @user = User.new(login: User.generate_login('C'), type: 'User', status: User::STATUS_ACTIVE, nickname: @params['comsys_name'], lastname: @params['comsys_name'])

    ActiveRecord::Base.transaction do
      @user.save!
      @user.create_user_extension!

      open_user.user = @user
      open_user.save!

      Rails.cache.write(open_user.can_bind_cache_key, 1, expires_in: 1.hours)
    end

    [@user, true]
  end
end