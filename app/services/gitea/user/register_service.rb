class Gitea::User::RegisterService < Gitea::ClientService
  API_REST = "/admin/users"
  def initialize(options = {})
    options.each_pair do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def call
    params = Hash.new.merge(data: user_params, token: @token)

    response = post(API_REST, params)
    response_payload(response)
  end

  private

  attr_reader :email, :username, :password

  def user_params
    {
      email: email,
      username: username,
      password: password,
      must_change_password: false #允许不更改秘密就可以登录
    }
  end

  def json_format(status, message, body)
    case status
    when 201 then success(body)
    else
      error(message, status)
    end
  end

  def response_payload(response)
    status = response.status
    body = response&.body

    log_error(status, body)
    status_payload(status, body)
  end

  def status_payload(status, body)
    case status
    when 201 then success(body)
    when 403 then error("你没有权限操作!")
    when 400 then error("服务器开小差了")
    when 422 
      body = json_parse!(body)
      message = body['message']
      puts "422 。。。。。 #{body}"
      puts "body messge : 00000000000 #{body['message']}"
      if message.include?('email')
        error("邮箱#{email}已被注册")
      elsif message.include?('name')
        error("用户名#{username}已被注册")
      end
    else error("系统错误!")
    end
  end

end
