module Searchable::Course
  extend ActiveSupport::Concern

  included do
    searchkick language: 'chinese', callbacks: :async

    scope :search_import, -> { includes(:teacher_users, teacher: { user_extension: :school } ) }
  end

  def searchable_title
    name
  end

  def search_data
    {
      laboratory_id: laboratory_id,
      name: name,
      author_name: teacher&.real_name
    }
  end

  def to_searchable_json
    {
      id: id,
      author_name: teacher&.real_name,
      author_school_name: teacher&.school_name,
      visits_count: visits,
      members_count: course_members_count,
      tasks_count: homework_commons_count + exercises_count + polls_count,
      is_public: is_public == 1,
      first_category_url: ApplicationController.helpers.module_url(none_hidden_course_modules.first, self)
    }
  end

  module ClassMethods
    def searchable_includes
      { teacher: { user_extension: :school } }
    end
  end
end
