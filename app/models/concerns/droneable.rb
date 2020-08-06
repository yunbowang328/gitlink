module Droneable
  extend ActiveSupport::Concern

  included do
  end

  def devops_uninit?
    self.devops_step === User::DEVOPS_UNINIT
  end

  def devops_unverified?
    self.devops_step === User::DEVOPS_UNVERIFIED
  end

  def devops_verified?
    self.devops_step === User::DEVOPS_VERIFIED
  end

  def devops_has_token?
    self.devops_step === User::DEVOPS_HAS_TOKEN
  end

  def set_drone_step!(step)
    self.update_column(:devops_step, step)
  end

  module ClassMethods
  end
end
