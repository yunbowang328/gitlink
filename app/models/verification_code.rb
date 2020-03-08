class VerificationCode < ApplicationRecord
  def effective?
    created_at + 10.minute > Time.current
  end
end
