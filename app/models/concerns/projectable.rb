module Projectable
  extend ActiveSupport::Concern

  included do
    has_many :projects
    
    scope :order_position, ->{order(position: :asc)}
    scope :without_content, -> { select(column_names - ['content'])}
  end

  module ClassMethods
  end
end
