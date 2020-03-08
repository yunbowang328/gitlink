module Likeable
  extend ActiveSupport::Concern

  included do
    has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  end

  def liked?(praiseable)
    praiseable.praise_treads.exists?(user_id: self.id)
  end

  def like!(praiseable)
    praiseable.praise_treads.create!(user_id: self.id)
  end

  def unlike!(praiseable)
    obj = praiseable.praise_treads.find_by(user_id: self.id)
    obj.destroy! if obj.present?
  end

end
