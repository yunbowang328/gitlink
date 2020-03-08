class Projects::MigrateForm < BaseForm
  REPOSITORY_NAME_REGEX = /^(?!_)(?!.*?_$)[a-zA-Z0-9_-]+$/ #只含有数字、字母、下划线不能以下划线开头和结尾
  URL_REGEX = /\A(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?\z/i

  attr_accessor :user_id, :name, :description, :repository_name, :project_category_id, :project_language_id, :clone_addr, :private

  validates :user_id, :name, :description,:repository_name, :project_category_id, :project_language_id, presence: true
  validates :repository_name, format: { with: REPOSITORY_NAME_REGEX, multiline: true, message: "只能含有数字、字母、下划线且不能以下划线开头和结尾" }
  validates :clone_addr, format: { with: URL_REGEX, multiline: true, message: "地址格式不正确" }
  validate do
    check_project_name(user_id, name) unless name.blank?
    check_repository_name(user_id, repository_name) unless repository_name.blank?
    check_project_category(project_category_id)
    check_project_language(project_language_id)
  end

end
