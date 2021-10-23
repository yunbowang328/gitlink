class Issues::CreateForm
  include ActiveModel::Model

  attr_accessor :subject

  validates :subject, presence: { message: "不能为空" }

  validates :subject, length: { maximum: 200, too_long: "不能超过200个字符" }


end
