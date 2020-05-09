module Projectable
  extend ActiveSupport::Concern

  included do
    has_many :projects, -> { order(position: :asc) }

    scope :without_content, -> { select(column_names - ['content'])}
  end

  module ClassMethods
  end
end
