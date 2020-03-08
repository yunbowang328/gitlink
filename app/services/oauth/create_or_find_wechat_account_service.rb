class Oauth::CreateOrFindWechatAccountService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    code = params['code'].to_s.strip
    raise Error, 'Code不能为空' if code.blank?
    new_user = false

    result = WechatOauth::Service.access_token(code)
    result = WechatOauth::Service.user_info(result['access_token'], result['openid'])

    # 存在该用户
    open_user = OpenUsers::Wechat.find_by(uid: result['unionid'])
    return [open_user.user, new_user] if open_user.present? && open_user.user.present?

    if user.blank? || !user.logged?
      new_user = true
      # 新用户
      # login = User.generate_login('w')
      # result['nickname'] = regix_emoji(result['nickname'])
      # @user = User.new(login: login, type: 'User', status: User::STATUS_ACTIVE)
      # @user = User.new(login: login, nickname: result['nickname'], type: 'User', status: User::STATUS_ACTIVE)
      set_session_openid(result['openid'])
      set_session_unionid(result['unionid'])
    else
      OpenUsers::Wechat.create!(user: user, uid: result['unionid'])
    end

=begin
    ActiveRecord::Base.transaction do
      if new_user
        user.save!

        gender = result['sex'].to_i == 1 ? 0 : 1
        user.create_user_extension!(gender: gender)

        # 下载头像
        avatar_path = Util::FileManage.source_disk_filename(user)
        Util.download_file(result['headimgurl'], avatar_path)
      end

      new_open_user= OpenUsers::Wechat.create!(user: user, uid: result['unionid'])

      Rails.cache.write(new_open_user.can_bind_cache_key, 1, expires_in: 1.hours) if new_user # 方便后面进行账号绑定
    end
=end

    [user, new_user]
  rescue WechatOauth::Error => ex
    raise Error, ex.message
  end

  private

  def code
    params[:code].to_s.strip
  end
end