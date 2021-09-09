class Projects::MigrateForm < BaseForm
  attr_accessor :user_id, :name, :repository_name, :project_category_id, :project_language_id, :clone_addr, :private, :is_mirror, :auth_username, :auth_password, :owner

  validates :user_id, :name, :repository_name, :clone_addr, presence: true
  validates :repository_name, format: { with: CustomRegexp::REPOSITORY_NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }
  validates :clone_addr, format: { with: CustomRegexp::URL_REGEX, multiline: true, message: "地址格式不正确" }
  validate do
    check_project_name(user_id, name) unless name.blank?
    check_repository_name(user_id, repository_name) unless repository_name.blank?
    check_project_category(project_category_id)
    check_project_language(project_language_id)
    check_owner
    check_max_repo_creation
  end

  def check_owner
    @owner = Owner.find_by(id: user_id)
    raise "user_id值无效." if user_id && owner.blank?
  end

  def check_max_repo_creation
    return unless owner.is_a?(Organization)
    return if owner.max_repo_creation <= -1
    raise "已超过组织设置最大仓库数" if owner.max_repo_creation == owner.num_projects
  end
end
