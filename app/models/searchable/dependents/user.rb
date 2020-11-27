module Searchable::Dependents::User
  extend ActiveSupport::Concern

  included do
    after_update_commit :check_searchable_dependents
  end

  private

  def check_searchable_dependents
    # if firstname_previously_changed? || lastname_previously_changed? || user_extension&.school_id_previously_changed?
    #   # reindex shixun
    #   created_shixuns.each(&:reindex)
    #
    #   # reindex course
    #   manage_courses.each(&:reindex)
    #
    #   # reindex subject
    #   created_subjects.each(&:reindex)
    #   subjects.each(&:reindex)
    # end
  end
end