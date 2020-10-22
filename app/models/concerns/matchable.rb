module Matchable
  extend ActiveSupport::Concern

  included do
    scope :with_project_category, ->(category_id) { where(project_category_id: category_id) unless category_id.blank? }
    scope :with_project_language, ->(language_id) { where(project_language_id: language_id) unless language_id.blank? }
    scope :with_project_type,     ->(project_type) { where(project_type: project_type) if Project.project_types.include?(project_type) }
    scope :by_name_or_identifier, ->(search) { where("name like :search or identifier LIKE :search", :search => "%#{search.split(" ").join('|')}%") unless search.blank? }
  end

end
