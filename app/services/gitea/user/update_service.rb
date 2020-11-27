class Gitea::User::UpdateService < Gitea::ClientService
  attr_reader :edit_username, :params
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

  def initialize(edit_username, params={}, token={username: Gitea.gitea_config[:access_key_id], password: Gitea.gitea_config[:access_key_secret]})
    @token         = token
    @params        = params
    @edit_username = edit_username
  end

  def call
    patch(url, data_params)
  end

  private

  def url
    "/admin/users/#{edit_username}"
  end

  def data_params
    Hash.new.merge(token: token, data: params)
  end
end
