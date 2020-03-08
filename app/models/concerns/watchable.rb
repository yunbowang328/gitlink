module Watchable
  extend ActiveSupport::Concern

  included do
    has_many :watchers, as: :watchable, dependent: :destroy
    has_many :watcher_users, through: :watchers, source: :user, validate: false

    scope :watched_by, -> (user_id) { includes(:watchers).where(watchers: { user_id: user_id }) }
  end

  def watched?(watchable)
    watchable.watchers.exists?(user: self)
  end

  def watch!(watchable)
    watchable.watchers.create!(user: self)
  end

  def unwatch!(watchable)
    obj = watchable.watchers.find_by(user: self)
    obj.destroy! if obj.present?
  end

  module ClassMethods
  end
end
