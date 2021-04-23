class Organizations::CreateForm < BaseForm
  NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  attr_accessor :name, :description, :website, :location, :repo_admin_change_team_access, :visibility, :max_repo_creation, :nickname

  validates :name, :nickname, :visibility, presence: true
  validates :name, format: { with: NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

end
