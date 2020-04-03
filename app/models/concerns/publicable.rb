module Publicable
  extend ActiveSupport::Concern

  included do
    scope :visible, -> { where(is_public: true) }
    scope :is_private, -> {where(is_public: false)}
  end
end
