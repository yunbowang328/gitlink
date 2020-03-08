class OpenUser < ApplicationRecord
  belongs_to :user

  validates :uid, presence: true, uniqueness: { scope: :type }

  serialize :extra, JSON

  def can_bind_cache_key
    "open_user:#{type}:#{uid}:can_bind"
  end
end