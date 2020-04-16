class Gitea::User::UpdateService < Gitea::ClientService
  # attr_reader :admin_user, :params
  attr_reader :token, :old_login, :params
  # 只有管理员才能修改用户信息
  # params:
  # admin	boolean
  # allow_create_organization	boolean
  # allow_git_hook	boolean
  # allow_import_local	boolean
  # email*	string($email)  # required
  # full_name	string
  # location	string
  # login_name*	string # required
  # max_repo_creation	integer($int64)
  # must_change_password	boolean
  # password	string
  # prohibit_login	boolean
  # source_id	integer($int64)
  # website	string

  def initialize(token, old_login, params={})
    @token = token
    @params = params
    @old_login = old_login
  end

  def call
    patch(url, data_params)
  end

  private

  def url
    "/admin/users/#{old_login}"
  end

  def data_params
    Hash.new.merge(token: token, data: params)
  end
end