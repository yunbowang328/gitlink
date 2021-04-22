module Watchable
  extend ActiveSupport::Concern

  included do
    has_many :watchers, as: :watchable, dependent: :destroy
    has_many :watcher_users, through: :watchers, source: :user, validate: false

    scope :watched_by, -> (user_id) { includes(:watchers).where(watchers: { user_id: user_id }) }
    scope :following, -> (user_id) { watched_by }
  end

  def watched?(watchable)
    watchable.watchers.exists?(user: self)
  end

  def watch!(watchable)
    watchable.watchers.create!(user: self, created_at: Time.current)
  end

  def unwatch!(watchable)
    obj = watchable.watchers.find_by(user: self)
    obj.destroy! if obj.present?
  end

  # 我正在关注的、我追随的
  def following
    User.following(self.id)
  end

  def following_count
    following.size
  end

  # 关注我的、我的粉丝、我的追随者
  def followers
    watcher_users
  end

  def followers_count
    followers.size
  end

  module ClassMethods
  end
end
