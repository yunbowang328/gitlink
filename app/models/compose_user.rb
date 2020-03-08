class ComposeUser < ApplicationRecord
  belongs_to :compose
  belongs_to :user
end
