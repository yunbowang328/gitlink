# == Schema Information
#
# Table name: verification_codes
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  code_type  :integer
#  status     :integer
#  phone      :string(255)
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  by_email  (email)
#  by_phone  (phone)
#

class VerificationCode < ApplicationRecord
  def effective?
    created_at + 10.minute > Time.current
  end
end
