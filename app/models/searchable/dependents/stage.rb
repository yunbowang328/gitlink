module Searchable::Dependents::Stage
  extend ActiveSupport::Concern

  included do
    after_update_commit :check_searchable_dependents
  end

  private

  def check_searchable_dependents
    if name_previously_changed? || description_previously_changed?
      subject.reindex
    end
  end
end