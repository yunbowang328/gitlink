class ApplySignature < ApplicationRecord
    belongs_to :user
    belongs_to :project

    scope :with_user_id, -> (user_id) {where(user_id: user_id)}
end
