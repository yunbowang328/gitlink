class Ci::Language < ApplicationRecord
  # before_save :encode_content

  belongs_to :cover, class_name: "Attachment", foreign_key: :cover_id, optional: true

  scope :six_common,           -> { limit(6).by_usage_amount_desc }
  scope :without_content,      -> { select(column_names - ['content']) }
  scope :by_usage_amount_desc, -> { order(usage_amount: :desc) }


  private
    def encode_content
      self.content = Base64.encode64 content
    end
end
