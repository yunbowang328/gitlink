class Weapps::UpdateCourseForm
  include ActiveModel::Model

  attr_accessor :course
  attr_accessor :name, :course_list_name, :credit, :end_date

  validates :name, presence: true
  validates :course_list_name, presence: true

  validate :course_name_prefix

  def course_name_prefix
    raise '课堂名称应以课程名称开头' unless name.index(course_list_name) && name.index(course_list_name) == 0
  end
end