class MemoForum < ApplicationRecord
  belongs_to :memo
  belongs_to :forum
  belongs_to :forum_section, foreign_key: "forum_id"
end
