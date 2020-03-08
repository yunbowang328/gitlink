class Gitea::User::RegisterService < Gitea::ClientService
  API_REST = "/admin/users"
  def initialize(options = {})
    options.each_pair do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  def call
    params = {}
    params = params.merge(data: user_params)
    post(API_REST, params)
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

end
