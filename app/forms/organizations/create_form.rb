class Organizations::CreateForm < BaseForm
  NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  attr_accessor :name, :description, :website, :location, :repo_admin_change_team_access, :visibility, :max_repo_creation, :nickname, :original_name

  validates :name, :nickname, :visibility, presence: true
  validates :name, :nickname, length: { maximum: 100 }
  validates :location, length: { maximum: 50 }
  validates :description, length: { maximum: 200 }
  validates :name, format: { with: NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

  validate do 
    check_name(name) unless name.blank? || name == original_name
  end

  def check_name(name)
    raise "组织账号已被使用." if Owner.where(login: name.strip).exists?
  end
end
