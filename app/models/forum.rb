class Forum < ApplicationRecord
  has_many :memos, dependent: :destroy
end
