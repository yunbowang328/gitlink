class Weapps::UpdateCourseService < ApplicationService
  attr_reader :course, :params

  def initialize(course, params)
    @course = course
    @params = params
  end

  def call
    Weapps::UpdateCourseForm.new(form_params).validate!

    ActiveRecord::Base.transaction do
      course.name = params[:name].to_s.strip
      course.credit = params[:credit].blank? ? nil : params[:credit]
      course.end_date = params[:end_date].blank? ? nil : params[:end_date]
      course_list = CourseList.find_by(name: params[:course_list_name].to_s.strip)
      if course_list
        course.course_list_id = course_list.id
      else
        new_course_list = CourseList.create!(name: params[:course_list_name].to_s.strip, user_id: course.tea_id, is_admin: 0)
        course.course_list_id = new_course_list.id
      end
      course.is_end = course.end_date.present? && course.end_date < Date.today
      course.save!
    end
    course
  end

  private

  def form_params
    params.merge(course: course)
  end
end