class ItemChoice < ApplicationRecord
  belongs_to :item_bank, touch: true
  validates :choice_text, presence: true, length: { maximum: 500, too_long: "不能超过500个字符" }

end
