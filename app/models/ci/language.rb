# == Schema Information
#
# Table name: ci_languages
#
#  id           :integer          not null, primary key
#  name         :string(255)      not null
#  content      :text(65535)      not null
#  usage_amount :integer          default("0")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  cover_id     :integer
#

class Ci::Language < Ci::LocalBase
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
