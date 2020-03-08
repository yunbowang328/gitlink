class Tiding < ApplicationRecord
  belongs_to :user
  belongs_to :trigger_user, class_name: 'User', optional: true
  belongs_to :container, polymorphic: true, optional: true
  belongs_to :parent_container, polymorphic: true, optional: true
  belongs_to :belong_container, polymorphic: true, optional: true

  has_many :attachments, as: :container

  scope :visible, -> { where(is_delete: 0) }

  def identifier
    value = nil

    value = container.try(:identifier) rescue nil

    if value.blank? && parent_container_type
      value = parent_container_type.try(:identifier) rescue nil
    end

    if value.blank? && belong_container_type
      value = belong_container.try(:identifier) rescue nil
    end

    value
  end

  def anonymous?
    (container_type == 'StudentWorksScore' && extra.to_i == 3) ||
      (container_type == 'StudentWorksScoresAppeal' && parent_container_type == 'StudentWork' && tiding_type == 'System')
  end
end