module Searchable::Memo
  extend ActiveSupport::Concern

  included do
    searchkick language: 'chinese', callbacks: :async

    scope :search_import, -> { includes(:descendants) }
  end

  def searchable_title
    subject
  end

  def should_index?
    hidden.zero? && root_id.blank? && parent_id.blank?
  end

  def search_data
    {
      name: subject,
      content: Util.extract_content(content)[0..Searchable::MAXIMUM_LENGTH],
    }.merge!(searchable_descendants_data)
  end

  def searchable_descendants_data
    {
      descendants_contents: Util.map_or_pluck(descendants, :content)
                              .map { |content| Util.extract_content(content)[0..Searchable::MAXIMUM_LENGTH] }
                              .join('<br/>')
    }
  end

  def to_searchable_json
    {
      id: id,
      author_name: author.full_name,
      visits_count: viewed_count,
      all_replies_count: all_replies_count
    }
  end

  module ClassMethods
    def searchable_includes
      [:author]
    end
  end
end
