module Callable
  extend ActiveSupport::Concern

  module ClassMethods
    def call(*parameters)
      new(*parameters).call
    end
  end
end