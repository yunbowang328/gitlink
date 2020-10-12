class BannedForum < ApplicationRecord
   # user_id  #被禁言用户
  # author_id  #禁言的创建者
  # memo_id   #禁言的帖子id
  # banned_count, default: 0 #被禁言的次数,每次禁言的时候+1
  # is_banned, default: false  #是否禁言
  belongs_to :user
  belongs_to :memo
  belongs_to :author, :class_name => 'User', :foreign_key => 'author_id'
end
