# == Schema Information
#
# Table name: passed_waitlists
#
#  id           :integer          not null, primary key
#  applicant_id :string(255)
#  integer      :string(255)
#  reviewer_id  :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class PassedWaitlist < ApplicationRecord
  belongs_to :applicant, class_name: 'User'
  belongs_to :reviewer, class_name: 'User'
end
