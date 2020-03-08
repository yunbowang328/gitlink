class CourseSecondCategory < ApplicationRecord
  default_scope { order("course_second_categories.position ASC") }

  belongs_to :course
  belongs_to :course_module
  has_many :homework_commons

  validates :name, length: { maximum: 60, too_long: "不能超过60个字符" }

  def category_type_str
    category_type == "graduation" && name == "毕设选题" ? "graduation_topics" : (
    category_type == "graduation" && name == "毕设任务" ? "graduation_tasks" : category_type
    )
  end
end
