class DiffRecord < ApplicationRecord
  belongs_to :user
  belongs_to :container, polymorphic: true

  has_one :diff_record_content, dependent: :destroy

  delegate :content, to: :diff_record_content
end