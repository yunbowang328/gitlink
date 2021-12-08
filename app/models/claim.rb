# == Schema Information
#
# Table name: claims
#
#  id         :integer          not null, primary key
#  issue_id   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  note       :text(65535)
#
# Indexes
#
#  index_claims_on_issue_id  (issue_id)
#  index_claims_on_user_id   (user_id)
#

class Claim < ApplicationRecord
    belongs_to :user, foreign_key: :user_id
    scope :claim_includes, ->{includes(:user)}
end
