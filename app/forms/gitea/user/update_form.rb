class Gitea::User::UpdateForm
  include ActiveModel::Model
  EMAIL_REGEX = /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9_\-.]+(\.[a-zA-Z0-9_-]+)+$/

  attr_accessor :username, :email, :admin, :allow_create_organization, :allow_git_hook, :allow_import_local,
                :full_name, :location, :login_name, :max_repo_creation, :must_change_password, :password, :prohibit_login,
                :source_id, :website

  validates :username, presence: true
  validates :email, presence: true, format: { with: EMAIL_REGEX, multiline: true }
end
