class ApplySignature < ApplicationRecord
    belongs_to :user
    belongs_to :project

    has_many :attachments, as: :container, dependent: :destroy

    scope :with_user_id, -> (user_id) {where(user_id: user_id)}

    enum status: {unpassed: -1, waiting: 0, passed: 1}
end
