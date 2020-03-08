class Oauth::CreateOrFindQqAccountService < ApplicationService

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    new_user = false
    # 存在该用户
    open_user = OpenUsers::QQ.find_by(uid: params['uid'])
    return [open_user.user, new_user] if open_user.present?

    if user.blank? || !user.logged?
      new_user = true
      # 新用户
      login = User.generate_login('Q')
      #nickname = regix_emoji params.dig('info', 'nickname')
      @user = User.new(login: login, type: 'User', status: User::STATUS_ACTIVE)
    end

    ActiveRecord::Base.transaction do
      if user.new_record?
        user.save!

        gender = params.dig('extra', 'raw_info', 'gender') == '女' ? 1 : 0
        user.create_user_extension!(gender: gender)
        # 下载头像
        avatar_path = Util::FileManage.source_disk_filename(user)
        Util.download_file(params.dig('info', 'image'), avatar_path)
      end

      new_open_user = OpenUsers::QQ.create!(user: user, uid: params['uid'])

      Rails.cache.write(new_open_user.can_bind_cache_key, 1, expires_in: 1.hours) if new_user # 方便后面进行账号绑定
    end

    [user, new_user]
  end
end