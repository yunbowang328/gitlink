module Projectable
  extend ActiveSupport::Concern

  included do
    has_many :projects, -> { order(position: :asc) }

    scope :without_content, -> { select(column_names - ['content'])}
    scope :search, lambda { |keywords|
      where("name LIKE ?", "%#{keywords.split(" ").join('|')}%") unless keywords.blank?
    }
  end

  module ClassMethods
  end
end
