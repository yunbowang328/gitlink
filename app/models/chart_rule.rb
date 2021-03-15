# == Schema Information
#
# Table name: chart_rules
#
#  id                   :integer          not null, primary key
#  rule_type            :string(255)
#  content              :text(65535)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  competition_id       :integer
#  competition_stage_id :integer
#
# Indexes
#
#  index_chart_rules_on_competition_id        (competition_id)
#  index_chart_rules_on_competition_stage_id  (competition_stage_id)
#

class ChartRule < ApplicationRecord

  validates :content, length: { maximum: 1000, too_long: "不能超过1000个字符" }
end
