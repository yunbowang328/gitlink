class Admins::StatisticSchoolContrastDataService < ApplicationService
  ParameterError = Class.new(StandardError)

  PAGE_SIZE = 20
  CONTRAST_COLUMN_LIST = %w(
    teacher_increase_count student_increase_count course_increase_count
    shixun_increase_count active_user_count shixun_homework_count shixun_evaluate_count
  ).freeze

  attr_reader :params, :sort_direction, :contrast_column

  def initialize(params)
    @params          = params
    @sort_direction  = params[:sort_direction].to_s
    @contrast_column = params[:contrast_column].to_s
  end

  def call
    validate_parameter!
    reports = School.joins(:school_daily_reports).select(select_columns)

    keyword = params[:keyword].try(:to_s).try(:strip)
    if keyword.present?
      reports = reports.where("schools.name LIKE :keyword OR schools.id LIKE :keyword", keyword: "%#{keyword}%")
    end

    count = reports.count('distinct(schools.id)')

    sql = query_report_sql(reports.group('schools.id').to_sql)
    reports = SchoolDailyReport.find_by_sql(sql)

    [count, reports]
  end

  private
  def validate_parameter!
    if %i[begin_date end_date other_begin_date other_end_date].any? { |key| params[key].blank? }
      raise ParameterError
    end

    unless %w(desc asc).include?(sort_direction)
      raise ParameterError
    end

    unless CONTRAST_COLUMN_LIST.include?(contrast_column)
      raise ParameterError
    end
  end

  def format_date(date)
    Time.zone.parse(date).strftime("%Y-%m-%d")
  end

  def offset
    (params[:page].to_i.zero? ? 0 : params[:page].to_i - 1) * PAGE_SIZE
  end

  def select_columns
    if contrast_column != 'active_user_count'
      "schools.id school_id, schools.name school_name,"\
      "(SUM(IF(date BETWEEN '#{format_date(params[:begin_date])}' AND '#{format_date(params[:end_date])}', #{contrast_column}, 0))) total,"\
      "(SUM(IF(date BETWEEN '#{format_date(params[:other_begin_date])}' AND '#{format_date(params[:other_end_date])}', #{contrast_column}, 0))) other_total"
    else
      # 活跃用户对比时处理方法不同
      relations = SchoolDailyActiveUser.select('COUNT(distinct user_id)').joins(:school_daily_report)
                    .where('school_id = schools.id')
      total_subquery = relations.where("date BETWEEN '#{format_date(params[:begin_date])}' AND '#{format_date(params[:end_date])}'").to_sql
      other_total_subquery = relations.where("date BETWEEN '#{format_date(params[:other_begin_date])}' AND '#{format_date(params[:other_end_date])}'").to_sql

      "schools.id school_id, schools.name school_name, (#{total_subquery}) AS total, (#{other_total_subquery}) AS other_total"
    end
  end

  def query_report_sql(from_sql)
    order_by = "(total = 0 AND other_total != 0) #{sort_direction}, (percentage != 0) #{sort_direction}, percentage #{sort_direction}"

    "SELECT reports.*, (other_total - total) increase, (IF(other_total - total = 0, 0.0, round((other_total - total) / IF(total = 0, 1, total), 5))) percentage "\
    "FROM (#{from_sql}) reports ORDER BY #{order_by} LIMIT #{PAGE_SIZE} OFFSET #{offset}"
  end
end