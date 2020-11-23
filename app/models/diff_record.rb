# == Schema Information
#
# Table name: diff_records
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  container_type :string(255)
#  container_id   :integer
#  column_name    :string(255)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_diff_records_on_container_type_and_container_id  (container_type,container_id)
#  index_diff_records_on_user_id                          (user_id)
#

class DiffRecord < ApplicationRecord
  belongs_to :user
  belongs_to :container, polymorphic: true

  has_one :diff_record_content, dependent: :destroy

  delegate :content, to: :diff_record_content
end
