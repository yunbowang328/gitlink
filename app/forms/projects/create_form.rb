class Projects::CreateForm < BaseForm
  REPOSITORY_NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  attr_accessor :user_id, :name, :description, :repository_name, :project_category_id,
                :project_language_id, :ignore_id, :license_id, :private, :owner
  
  validates :user_id, :name, :repository_name, presence: true
  validates :repository_name, format: { with: REPOSITORY_NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

  validates :name, length: { maximum: 50 }
  validates :repository_name, length: { maximum: 100 }
  validates :description, length: { maximum: 200 }

  validate :check_ignore, :check_license, :check_owner, :check_max_repo_creation
  validate do
    check_project_category(project_category_id)
    check_project_language(project_language_id)
    check_project_name(user_id, name) unless name.blank?
    check_repository_name(user_id, repository_name) unless repository_name.blank?
  end

  def check_license
    raise "license_id值无效. " if license_id && License.find_by(id: license_id).blank?
  end

  def check_ignore
    raise "ignore_id值无效." if ignore_id && Ignore.find_by(id: ignore_id).blank?
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
