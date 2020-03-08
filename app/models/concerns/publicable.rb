module Publicable
  extend ActiveSupport::Concern

  included do
    scope :visible, -> { where(is_public: true) }
  end
end
