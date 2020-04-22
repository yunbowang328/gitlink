module Matchable
  extend ActiveSupport::Concern

  included do
    # scope :like, lambda { |keywords|
    #   joins(:repository).where(%w[ projects.name projects.identifier repositories.identifier ].map { |f| "LOWER(#{f}) LIKE :q" }.join(' OR '), q: "%#{keywords.split(" ").join('|')}%") unless keywords.blank?
    # }
    scope :like, lambda { |keywords|
      joins(:repository).where("LOWER(projects.name) like ? or LOWER(projects.identifier) like ? or LOWER(repositories.identifier) like ?", "%#{keywords.downcase}","%#{keywords.downcase}","%#{keywords.downcase}") unless keywords.blank?
    }
    scope :with_project_category, ->(category_id) { where(project_category_id: category_id) unless category_id.blank? }
    scope :with_project_language, ->(language_id) { where(project_language_id: language_id) unless language_id.blank? }
    scope :with_project_type,     ->(project_type) { where(project_type: project_type) if Project.project_types.include?(project_type) }
  end

end
