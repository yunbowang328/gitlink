class Waitlist < ApplicationRecord
  belongs_to :applicant, class_name: 'User'
  belongs_to :reviewer, class_name: 'User', optional: true
end
