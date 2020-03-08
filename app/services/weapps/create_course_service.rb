class Weapps::CreateCourseService < ApplicationService
  attr_reader :course, :params

  def initialize(course, params)
    @course = course
    @params = params
  end

  def call
    Weapps::CreateCourseForm.new(form_params).validate!

    ActiveRecord::Base.transaction do
      course.name = params[:name].to_s.strip
      course.school_id = course.teacher&.school_id
      course.is_public = 0
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

      course.generate_invite_code
      CourseMember.create!(course_id: course.id, user_id: course.tea_id, role: 1)
      course.create_course_modules(params[:course_module_types])
    end
  end

  private

  def form_params
    params.merge(course: course)
  end
end