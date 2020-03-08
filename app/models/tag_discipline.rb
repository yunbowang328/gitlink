class TagDiscipline < ApplicationRecord
  belongs_to :sub_discipline
  belongs_to :user, optional: true
  has_many :tag_discipline_containers, dependent: :destroy

  validates_presence_of :name
  validates :name, length: { maximum: 15, too_long: "不能超过15个字符" }

  def discipline
    sub_discipline&.discipline
  end
end
