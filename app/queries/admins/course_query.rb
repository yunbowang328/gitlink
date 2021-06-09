class Admins::CourseQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc, default_table: 'courses'

  def initialize(params)
    @params = params
  end

  def call
    courses = Course.all

    courses = courses.where(id: params[:id]) if params[:id].present?

    # 状态过滤
    status =
      case params[:status].to_s.strip
      when 'processing'   then 0
      when 'ended'  then 1
      end
    courses = courses.where(is_end: status) if status

    # 单位
    if params[:school_id].present?
      courses = courses.where(school_id: params[:school_id])
    end

    # 首页展示
    if params[:homepage_show].present? && params[:homepage_show].to_s == 'true'
      courses = courses.where(homepage_show: true)
    end

    # 关键字
    keyword = params[:keyword].to_s.strip
    if keyword
      sql = 'CONCAT_WS(lastname, firstname, nickname) LIKE :keyword OR courses.name LIKE :keyword OR course_lists.name LIKE :keyword'
      courses = courses.joins(:teacher, :course_list).where(sql, keyword: "%#{keyword}%")
    end

    custom_sort(courses, params[:sort_by], params[:sort_direction])
  end
end