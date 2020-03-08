class ItemAnalysis < ApplicationRecord
  belongs_to :item_bank, touch: true
  validates :analysis, length: { maximum: 5000, too_long: "不能超过5000个字符" }
end
