# == Schema Information
#
# Table name: apply_actions
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  reason             :string(255)
#  container_id       :integer
#  container_type     :string(255)
#  dealer_id          :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  status             :integer          default("0")
#  apply_reason       :text(65535)
#  noticed            :boolean          default("0")
#  ip_addr            :string(255)
#  reject_description :string(255)
#
# Indexes
#
#  index_apply_actions_on_user_id  (user_id)
#

# 申请消息
class ApplyAction < ApplicationRecord
  belongs_to :user

  has_many :tidings, :as => :container, :dependent => :destroy
  after_create :send_tiding

  def status_text
    I18n.t!("apply_action.status.#{status}")
  rescue I18n::MissingTranslationData
    nil
  end

  def send_tiding
    if container_type == 'TrialAuthorization' && status == 1
      tidings.create(user_id: user_id, trigger_user_id: 0, status: 1, viewed: 0, tiding_type: 'System',
                     parent_container_id: container_id, parent_container_type: container_type,
                     belong_container_id: container_id, belong_container_type: 'User')
    elsif %w(ApplyShixun ApplySubject TrialAuthorization).include?(container_type)
      belong_container_type = if container_type == 'TrialAuthorization'
                                'User'
                              else
                                container_type == 'ApplyShixun' ? 'Shixun' : 'Subject'
                              end
      tidings.create(user_id: '1', trigger_user_id: user_id, status: 0, viewed: 0, tiding_type: 'Apply',
                     parent_container_id: container_id, parent_container_type: container_type,
                     belong_container_id: container_id, belong_container_type: belong_container_type)
    end
  end
end
