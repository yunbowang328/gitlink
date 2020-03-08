class OauthController < ApplicationController
  DEFAULT_PASSWORD = "a12345678"
  TOKEN_CALL_BACK = "/oauth/get_token_callback"
  USER_INFO = "/oauth/userinfo"

  def get_code
    identity_site = edu_setting('openi_domain')
    root_url = edu_setting('educoder_domain')

    # 从OpenI发过来的回调中获取授权码
    code = params[:code]

    # 利用授权码从OpenI这里获取access_token
    client = get_client(identity_site)
    redirect_uri = "#{root_url}#{TOKEN_CALL_BACK}"
    access_token_hash = client.auth_code.get_token(code, redirect_uri: redirect_uri).to_hash

    # 利用access_token获取OpenI的用户信息
    access_token = access_token_hash[:access_token]
    get_info_url = "#{identity_site}#{USER_INFO}?access_token=#{access_token}"
    response = HTTParty.get(get_info_url)
    body_json = JSON.parse response.body

    openi_user_id = body_json['token']
    avatar_url = body_json['avatar_url']
    login = body_json['login']
    name = body_json['name']
    email = body_json['email']

    # 根据获取的用户信息来查询数据库，如已经存在对应的Educoder用户，则直接访问用户要访问的实训页面，否则为其创建用户后再访问实训页面
    openi = Openi.find_by_login(login)
    unless openi
      ActiveRecord::Base.transaction do
        user = User.new(lastname: name, mail: email, mail_notification: email)
        user.login = login
        user.password = DEFAULT_PASSWORD
        user.save!

        UserExtensions.create!(user_id: user.id, school_id: School.first.id, identity: 4, gender: 0)

        UserDayCertification.create!(user_id: user.id, status: 1)

        openi = Openi.create!(user_id: user.id, openi_user_id: openi_user_id, avatar_url: avatar_url, login: login, name: name, email: email)
      end
    end

    self.logged_user = openi.user
    original_url = params[:original_url]
    redirect_to original_url
  end

  def get_token_callback
  end
end
