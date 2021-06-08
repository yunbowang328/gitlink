class Admins::CourseListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    course_lists = CourseList.all

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      search_type = params[:search_type] || "0"
      case search_type
      when "0"
        course_lists = course_lists.joins(:user)
                      .where('CONCAT_WS(lastname, firstname, nickname) like :keyword', keyword: "%#{keyword}%")
      when "1"
        course_lists = course_lists.where('name like :keyword', keyword: "%#{keyword}%")
      end
    end

    custom_sort(course_lists, params[:sort_by], params[:sort_direction])
  end
end