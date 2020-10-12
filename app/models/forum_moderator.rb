class ForumModerator < ApplicationRecord
  #版主的表
  # attr_accessible :title, :body
  belongs_to :forum_section
  belongs_to :user

  scope :children_moder, -> {where(is_children: true)}
end
