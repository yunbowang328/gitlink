# == Schema Information
#
# Table name: apply_signatures
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  project_id :integer
#  status     :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_apply_signatures_on_project_id  (project_id)
#  index_apply_signatures_on_user_id     (user_id)
#

class ApplySignature < ApplicationRecord
    belongs_to :user
    belongs_to :project

    has_many :attachments, as: :container, dependent: :destroy

    scope :with_user_id, -> (user_id) {where(user_id: user_id)}
    scope :with_status, -> (status) {where(status: status) if status.present? && status != "all"}

    validates :project_id, uniqueness: {scope: :user_id}

    enum status: {unpassed: -1, waiting: 0, passed: 1}
end
