class ApiKey < ApplicationRecord
  attr_accessor :access_token, :active, :expires_at, :user_id
  before_create :generate_access_token
  before_create :set_experation

  # validates_presence_of :user_id, :access_token

  def expired?
    DateTime.now >= self.expires_at
  end

  private
  def generate_access_token
    self.access_token = SecureRandom.hex
  end

  def set_experation
    self.expires_at = DateTime.now + 30
  end
end
