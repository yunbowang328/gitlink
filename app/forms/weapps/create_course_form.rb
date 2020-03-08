class Weapps::CreateCourseForm
  include ActiveModel::Model

  attr_accessor :course
  attr_accessor :name, :course_list_name, :credit, :course_module_types, :end_date

  validates :name, presence: true
  validates :course_list_name, presence: true

  validate :course_name_prefix
  validate :check_course_modules

  def course_name_prefix
    raise '课堂名称应以课程名称开头' unless name.index(course_list_name) && name.index(course_list_name) == 0
  end

  def check_course_modules
    raise '请至少添加一个课堂模块' if course_module_types.blank?
  end
end