class Projects::UpdateForm < BaseForm
  attr_accessor :name, :description, :project_category_id, :project_language_id, :private, :identifier, :user_id, :project_identifier
  validates :name, presence: true
  validates :name, length: { maximum: 50 }
  validates :description, length: { maximum: 200 }
  validates :identifier, format: { with: CustomRegexp::REPOSITORY_NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }

  validate do
    check_project_category(project_category_id)
    check_project_language(project_language_id)

    check_repository_name(user_id, identifier) unless identifier.blank? || identifier == project_identifier
  end

end
