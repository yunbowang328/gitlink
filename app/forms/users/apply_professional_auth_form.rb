class Users::ApplyProfessionalAuthForm
  include ActiveModel::Model

  attr_accessor :school_id, :department_id, :identity, :extra, :upload_image, :attachment_ids

  validates :school_id, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :department_id, numericality: { only_integer: true, greater_than: 0 }, allow_blank: true
  validates :identity, presence: true, inclusion: { in: %w(student teacher professional) }
  validates :extra, presence: true
  validate :validate_attachment_ids

  def validate_attachment_ids
    unless attachment_ids.is_a?(Array) || attachment_ids.length != 1
      raise("图片参数不对")
    end
  end
end