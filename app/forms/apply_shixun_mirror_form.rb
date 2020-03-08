class ApplyShixunMirrorForm
  include ActiveModel::Model

  attr_accessor :language, :runtime, :run_method, :attachment_id

  validates :language, presence: true
  validates :runtime, presence: true
  validates :run_method, presence: true
  validates :attachment_id, presence: true, numericality: { only_integer: true }

  validate :ensure_attachment_presence
  def ensure_attachment_presence
    return unless attachment_id

    if attachment.blank?
      errors.add(:attachment_id, :attachment_not_exist)
    end
  end

  def attachment
    @attachment ||= Attachment.find_by_id(attachment_id)
  end

  def to_json
    { language: language, runtime: runtime, run_method: run_method, attachment_id: attachment_id }.to_json
  end
end