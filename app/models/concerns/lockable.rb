module Lockable
  extend ActiveSupport::Concern

  included do
  end

  def locked?(is_member)
    is_member == true ? false : !publiced?
  end
end
