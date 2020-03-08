module Publishable
  extend ActiveSupport::Concern

  included do
    alias_attribute :publish, :is_publish
    enum publish: { published: 1, unpublish: 0 }
  end

end
