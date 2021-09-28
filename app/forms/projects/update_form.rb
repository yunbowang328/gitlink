class Projects::UpdateForm < BaseForm
  attr_accessor :name, :description, :project_category_id, :project_language_id, :private
  validates :name, presence: true
  validates :name, length: { maximum: 50 }
  validates :description, length: { maximum: 200 }
  validate do
    check_project_category(project_category_id)
    check_project_language(project_language_id)
  end

end
