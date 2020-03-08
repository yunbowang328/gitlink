class CourseModule < ApplicationRecord
  default_scope { order("course_modules.position ASC") }
  belongs_to :course

  # 二级目录
  has_many :course_second_categories

  validates :module_name, length: { maximum: 20, too_long: "不能超过20个字符" }

  scope :not_hidden,                   -> { where(hidden: 0) }
  scope :graduation_module,            -> { where(module_type: "graduation") }
  scope :graduation_module_not_hidden, -> { graduation_module.where(hidden: 0) }
  scope :board_module,                 -> { where(module_type: 'board') }
  scope :attachment_module,            -> { includes(:course_second_categories).where(module_type: 'attachment') }
  scope :common_homework_module,       -> { where(module_type: 'common_homework') }
  scope :group_homework_module,        -> { where(module_type: 'group_homework') }
  scope :shixun_homework_module,       -> { where(module_type: 'shixun_homework') }
  scope :search_by_module_type,        -> (type) {where(module_type:type)}

  # 课堂模块的子目录
  def course_second_categories
    if module_type == "graduation" && CourseSecondCategory.where(course_module_id: self.id).count == 0
      CourseSecondCategory.create!(course_module_id: self.id, course_id: self.course_id, name: "毕设选题", category_type: "graduation", position: 1)
      CourseSecondCategory.create!(course_module_id: self.id, course_id: self.course_id, name: "毕设任务", category_type: "graduation", position: 2)
    end
    CourseSecondCategory.where(course_module_id: self.id)
  end
end
