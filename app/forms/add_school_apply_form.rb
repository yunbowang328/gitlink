class AddSchoolApplyForm
  include ActiveModel::Model

  attr_accessor :name, :province, :city, :address, :remarks

  validates :name, presence: true
  # validates :province, presence: true
  # validates :city, presence: true
  # validates :address, presence: true
end