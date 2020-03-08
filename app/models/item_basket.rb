class ItemBasket < ApplicationRecord
  enum item_type: { SINGLE: 0, MULTIPLE: 1, JUDGMENT: 2, COMPLETION: 3, SUBJECTIVE: 4, PRACTICAL: 5, PROGRAM: 6 }

  belongs_to :item_bank
  belongs_to :user, optional: true
  belongs_to :examination_intelligent_setting, optional: true
end
