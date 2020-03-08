class Repertoire < ApplicationRecord
  has_many :sub_repertoires, ->{order(updated_at: :desc)}, :dependent => :destroy

  has_many :tag_repertoires, through: :sub_repertoires
  has_many :user_interests, dependent: :delete_all
end
