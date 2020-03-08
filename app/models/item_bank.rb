class ItemBank < ApplicationRecord
  # difficulty:  1 简单  2 适中  3 困难
  enum item_type: { SINGLE: 0, MULTIPLE: 1, JUDGMENT: 2, COMPLETION: 3, SUBJECTIVE: 4, PRACTICAL: 5, PROGRAM: 6 }
  # item_type:  0 单选  1 多选  2 判断  3 填空  4 简答  5 实训 6 编程

  belongs_to :user
  belongs_to :sub_discipline, optional: true

  has_one :item_analysis, dependent: :destroy
  has_many :item_choices, dependent: :destroy
  has_many :item_baskets, dependent: :destroy
  has_many :tag_discipline_containers, as: :container, dependent: :destroy
  has_many :tag_disciplines, through: :tag_discipline_containers

  belongs_to :container, polymorphic: true, optional: true
  validates :name, presence: true, length: { maximum: 1000, too_long: "不能超过1000个字符" }

  def analysis
    item_analysis&.analysis
  end

  def apply?
    !public && ApplyAction.exists?(container_type: "ItemBank", container_id: id, status: 0)
  end

  def type_string
    case item_type
    when "SINGLE"     then "单选题"
    when "MULTIPLE"   then "多选题"
    when "JUDGMENT"   then "判断题"
    when "COMPLETION" then "填空题"
    when "SUBJECTIVE" then "简答题"
    when "PRACTICAL"  then "实训题"
    when "PROGRAM"    then "编程题"
    end
  end

  def difficulty_string
    case difficulty
    when 1 then "简单"
    when 2 then "适中"
    when 3 then "困难"
    end
  end
end
