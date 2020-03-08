module Searchable::Dependents::ChallengeTag
  extend ActiveSupport::Concern

  included do
    after_create_commit :check_searchable_dependents
    after_update_commit :check_searchable_dependents
  end

  private

  def check_searchable_dependents
    if new_record? || name_previously_changed?
      challenge.shixun.reindex
    end
  end
end