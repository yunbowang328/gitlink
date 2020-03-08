class PrivateMessage < ApplicationRecord
  belongs_to :user
  belongs_to :target, class_name: "User"
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  scope :without_deleted, -> { where.not(status: 2) }
  scope :only_unread, -> { where(status: 0) }
end
