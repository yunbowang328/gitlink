class Issues::UpdateForm
  include ActiveModel::Model

  attr_accessor :subject,:description,:is_private,:assigned_to_id,:tracker_id,:status_id,:priority_id,:fixed_version_id,:start_date,:due_date,:estimated_hours,:done_ratio,:issue_type,:token,:issue_tags_value,:closed_on,:branch_name,:issue_classify,:author_id,:project_id

  validates :subject, presence: { message: "不能为空" }

  validates :subject, length: { maximum: 80, too_long: "不能超过80个字符" }

end