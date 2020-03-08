class Users::ApplyAuthenticationForm
  include ActiveModel::Model

  attr_accessor :name, :show_realname, :id_number, :gender, :upload_image, :attachment_ids

  validates :name, presence: true, length: { minimum: 2, maximum: 10 }, format: { with: CustomRegexp::LASTNAME, message: "2-10位中英文、数字" }
  validate :validate_ID_number
  validate :validate_attachment_ids


  def validate_ID_number
    unless id_number =~ User::VALID_NUMBER_REGEX
      raise("身份证格式不对")
    end
  end

  def validate_attachment_ids
    unless attachment_ids.is_a?(Array) || attachment_ids.length != 1
      raise("图片参数不对")
    end
  end
end