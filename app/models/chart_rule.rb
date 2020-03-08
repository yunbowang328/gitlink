class ChartRule < ApplicationRecord

  validates :content, length: { maximum: 1000, too_long: "不能超过1000个字符" }
end
