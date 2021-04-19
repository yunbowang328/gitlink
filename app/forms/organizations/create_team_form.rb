class Organizations::CreateTeamForm < BaseForm
  NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  attr_accessor :name, :nickname, :description, :authorize, :includes_all_project, :can_create_org_project, :unit_types

  validates :name, :nickname, :authorize, presence: true
  validates :name, format: { with: NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

end
