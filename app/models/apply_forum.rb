class ApplyForum < ApplicationRecord
  #is_confirm 默认为0， 1为通过，2为拒绝
  belongs_to :user
  belongs_to :forum_section
  has_many :reviews, as: :reviewable,dependent: :destroy
end
