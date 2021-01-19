class Projects::CreateForm < BaseForm
  REPOSITORY_NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  attr_accessor :user_id, :name, :description, :repository_name, :project_category_id,
                :project_language_id, :ignore_id, :license_id, :private

  validates :user_id, :name, :description,:repository_name,
            :project_category_id, :project_language_id, presence: true
  validates :repository_name, format: { with: REPOSITORY_NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

  validate :check_ignore, :check_license, :check_owner
  validate do
    check_project_category(project_category_id)
    check_project_language(project_language_id)
  end

  def check_license
    raise "license_id值无效. " if license_id && License.find_by(id: license_id).blank?
  end

  def check_ignore
    raise "ignore_id值无效." if ignore_id && Ignore.find_by(id: ignore_id).blank?
  end

  def check_owner
    raise "user_id值无效." if user_id && Owner.find_by(id: user_id).blank?
  end
end
