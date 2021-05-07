class Issues::CreateForm
  include ActiveModel::Model

  attr_accessor :subject

  validates :subject, presence: { message: "不能为空" }

  validates :subject, length: { maximum: 80, too_long: "不能超过80个字符" }


end
