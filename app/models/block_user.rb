class BlockUser < ApplicationRecord
  belongs_to :user
  scope :block_user_present, ->(target_id){where(block_user_id: target_id)}
end
