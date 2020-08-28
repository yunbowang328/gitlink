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

  def set_drone_step!(step)
    self.update_column(:devops_step, step)
  end

  def ci_certification?
    Ci::User.exists?(user_login: self.login)
  end

  module ClassMethods
  end
end
