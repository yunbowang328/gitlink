# == Schema Information
#
# Table name: tidings
#
#  id                    :integer          not null, primary key
#  user_id               :integer
#  trigger_user_id       :integer
#  container_id          :integer
#  container_type        :string(255)
#  parent_container_id   :integer
#  parent_container_type :string(255)
#  belong_container_id   :integer
#  belong_container_type :string(255)
#  status                :integer          default("0")
#  viewed                :boolean
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  tiding_type           :string(255)
#  extra                 :string(255)
#  is_delete             :boolean          default("0")
#
# Indexes
#
#  index_tidings_on_container_id  (container_id)
#  index_tidings_on_user_id       (user_id)
#

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
