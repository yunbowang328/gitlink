class Admins::SchoolDailyStatisticService < ApplicationService
  include CustomSortable

  attr_reader :params

  sort_columns :student_count, :teacher_count, :homework_count, :other_homework_count,
               :course_count, :active_course_count, :nearly_course_time, :shixun_count, :shixun_evaluate_count,
               default_by: :teacher_count, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    schools = School.group('schools.id')

    keyword = params[:keyword].try(:to_s).try(:strip)
    if keyword.present?
      schools = schools.where("schools.name LIKE :keyword OR schools.id LIKE :keyword", keyword: "%#{keyword}%")
    end

    count = schools.count.count

    # 根据排序字段进行查询
    schools = query_by_sort_column(schools, params[:sort_by])
    schools = custom_sort(schools, params[:sort_by], params[:sort_direction])

    schools = schools.limit(page_size).offset(offset)
    # 查询并组装其它数据
    schools = package_other_data(schools)

    [count, schools]
  end

  def package_other_data(schools)
    ids = schools.map(&:id)

    student_map = UserExtension.where(school_id: ids, identity: :student).group(:school_id).count
    teacher_map = UserExtension.where(school_id: ids, identity: :teacher).group(:school_id).count

    homeworks = HomeworkCommon.joins(:course)
    shixun_homework_map = homeworks.where(homework_type: 4, courses: { school_id: ids }).group('school_id').count
    other_homework_map = homeworks.where(homework_type: [1, 3], courses: { school_id: ids }).group('school_id').count

    courses = Course.where(is_delete: 0, school_id: ids).group('school_id')
    course_map = courses.count
    nearly_course_time_map = courses.joins(:course_acts).maximum('course_activities.updated_at')
    active_course_map = courses.where(is_end: false).count

    shixun_map = Shixun.joins(user: :user_extension).where(user_extensions: { identity: :teacher, school_id: ids })
                   .where(fork_from: nil).group('school_id').count

    reports = SchoolReport.where(school_id: ids)
    evaluate_count_map = reports.each_with_object({}) { |report, obj| obj[report.school_id] = report.shixun_evaluate_count }

    schools.map do |school|
      {
        id: school.id,
        name: school.name,
        teacher_count: teacher_map[school.id],
        student_count: student_map[school.id],
        homework_count: shixun_homework_map[school.id],
        other_homework_count: other_homework_map[school.id],
        course_count: course_map[school.id],
        nearly_course_time: nearly_course_time_map[school.id],
        active_course_count: active_course_map[school.id],
        shixun_count: shixun_map.fetch(school.id, 0),
        shixun_evaluate_count: evaluate_count_map.fetch(school.id, 0)
      }
    end
  end

  private
  def query_by_sort_column(schools, sort_by_column)
    base_query_column = 'schools.id, schools.name'

    case sort_by_column.to_s
    when 'teacher_count' then
      schools.joins('LEFT JOIN user_extensions ue ON ue.school_id = schools.id AND ue.identity = 0')
        .select("#{base_query_column}, COUNT(*) teacher_count")
    when 'student_count' then
      schools.joins('LEFT JOIN user_extensions ue ON ue.school_id = schools.id AND ue.identity = 1')
        .select("#{base_query_column}, COUNT(*) student_count")
    when 'homework_count' then
      schools.joins('LEFT JOIN courses ON courses.school_id = schools.id')
        .joins('LEFT JOIN homework_commons hc ON hc.course_id = courses.id AND hc.homework_type = 4')
        .select("#{base_query_column}, COUNT(*) homework_count")
    when 'other_homework_count' then
      schools.joins('LEFT JOIN courses ON courses.school_id = schools.id')
        .joins('LEFT JOIN homework_commons hc ON hc.course_id = courses.id AND hc.homework_type IN (1, 3)')
        .select("#{base_query_column}, COUNT(*) other_homework_count")
    when 'course_count' then
      schools.joins('LEFT JOIN courses cs ON cs.school_id = schools.id AND cs.is_delete = 0')
        .select("#{base_query_column}, COUNT(*) course_count")
    when 'shixun_count' then
      schools.joins('LEFT JOIN user_extensions ue ON ue.school_id = schools.id AND ue.identity = 0')
        .joins('LEFT JOIN users ON users.id = ue.user_id')
        .joins('LEFT JOIN shixuns sx ON sx.user_id = users.id AND sx.fork_from IS NULL')
        .select("#{base_query_column}, COUNT(*) shixun_count")
    when 'shixun_evaluate_count' then
      schools.joins('LEFT JOIN school_reports ON school_reports.school_id = schools.id')
        .select("#{base_query_column}, shixun_evaluate_count")
    when 'nearly_course_time' then
      schools.joins('LEFT JOIN courses cs ON cs.school_id = schools.id AND cs.is_delete = 0')
        .joins('LEFT JOIN course_activities acs ON acs.course_id = cs.id')
        .select("#{base_query_column}, MAX(acs.updated_at) nearly_course_time")
    when 'active_course_count' then
      schools.joins('LEFT JOIN courses cs ON cs.school_id = schools.id AND cs.is_delete = 0 AND cs.is_end = false')
        .select("#{base_query_column}, COUNT(*) active_course_count")
    else
      schools.joins('LEFT JOIN user_extensions ue ON ue.school_id = schools.id AND ue.identity = 0')
        .select("#{base_query_column}, COUNT(*) teacher_count")
    end
  end

  def page_size
    params[:per_page] || 20
  end

  def offset
    (params[:page].to_i.zero? ? 0 : params[:page].to_i - 1) * page_size
  end
end