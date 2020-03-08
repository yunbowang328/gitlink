class Admins::StatisticSchoolDataGrowService < ApplicationService
  include CustomSortable

  PAGE_SIZE = 20

  attr_reader :params

  sort_columns :teacher_increase_count, :student_increase_count,
               :course_increase_count, :shixun_increase_count, :uniq_active_user_count,
               :shixun_homework_count, :shixun_evaluate_count,
               default_by: :teacher_increase_count, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    reports = School.where(nil)

    reports = search_filter(reports)

    count = reports.count

    subquery = SchoolDailyActiveUser.select('COUNT(distinct(user_id))').joins(:school_daily_report)
                 .where(date_condition_sql).where("school_id is not null and school_id = schools.id").to_sql
    reports = reports.joins("LEFT JOIN school_daily_reports sdr ON sdr.school_id = schools.id AND #{date_condition_sql}")
    reports = reports.select(
      'schools.id school_id, schools.name school_name,'\
      'SUM(teacher_increase_count) teacher_increase_count,'\
      'SUM(student_increase_count) student_increase_count,'\
      'SUM(course_increase_count) course_increase_count,'\
      'SUM(shixun_increase_count) shixun_increase_count,'\
      'SUM(shixun_homework_count) shixun_homework_count,'\
      'SUM(shixun_evaluate_count) shixun_evaluate_count,'\
      "(#{subquery}) uniq_active_user_count,"\
      'SUM(active_user_count) active_user_count').group('schools.id')

    reports = custom_sort(reports, params[:sort_by], params[:sort_direction])
    reports = reports.order('school_id asc').limit(PAGE_SIZE).offset(offset)

    [count, reports]
  end

  def grow_summary
    @_grow_summary ||= begin
      reports = School.joins("LEFT JOIN school_daily_reports sdr ON sdr.school_id = schools.id")
                  .where(date_condition_sql)

      subquery = SchoolDailyActiveUser.select('COUNT(distinct user_id)')
                   .joins('LEFT JOIN school_daily_reports sdr ON sdr.id = school_daily_active_users.school_daily_report_id')
                   .where(date_condition_sql).to_sql
      reports = search_filter(reports)
      reports.select(
        'SUM(teacher_increase_count) teacher_increase_count,'\
        'SUM(student_increase_count) student_increase_count,'\
        'SUM(course_increase_count) course_increase_count,'\
        'SUM(shixun_increase_count) shixun_increase_count,'\
        'SUM(shixun_homework_count) shixun_homework_count,'\
        'SUM(shixun_evaluate_count) shixun_evaluate_count,'\
        "(#{subquery}) uniq_active_user_count,"\
        'SUM(active_user_count) active_user_count'
      ).first
    end
  end

  private

  def search_filter(relations)
    keyword = params[:keyword].try(:to_s).try(:strip)
    if keyword.present?
      relations = relations.where("schools.name LIKE :keyword OR schools.id LIKE :keyword", keyword: "%#{keyword}%")
    end

    relations
  end

  def date_condition_sql
    date = query_date
    if date.is_a?(Range)
      "date BETWEEN '#{date.min.strftime('%Y-%m-%d')}' AND '#{date.max.strftime('%Y-%m-%d')}'"
    else
      "date = '#{date.strftime('%Y-%m-%d')}'"
    end
  end

  def query_date
    if params[:grow_begin_date].present?
      begin_time = Time.zone.parse(params[:grow_begin_date])
      end_date = if params[:grow_end_date].present?
                   Time.zone.parse(params[:grow_end_date])
                 end

      end_date.blank? || end_date == begin_time ? begin_time : begin_time..end_date
    else
      yesterday
    end
  end

  def yesterday
    # 每日凌晨5点为节点, 25日凌晨4点、3点、2点等等，未到更新数据时间点，看到的数据是：23日-24日的统计数据
    (Time.zone.now - 5.hours).beginning_of_day - 1.days
  end

  def offset
    (params[:page].to_i.zero? ? 0 : params[:page].to_i - 1) * PAGE_SIZE
  end
end