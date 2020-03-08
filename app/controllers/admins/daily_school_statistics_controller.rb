class Admins::DailySchoolStatisticsController < Admins::BaseController
  def index
    params[:sort_by] = params[:sort_by].presence || :teacher_count
    params[:sort_direction] = params[:sort_direction].presence || :desc

    total_count, statistics = Admins::SchoolDailyStatisticService.call(params)

    @statistics = paginate statistics, total_count: total_count
    @params_page = params[:page] || 1

    respond_to do |format|
      format.html { load_statistic_total }
      format.js
    end
  end

  def export
    params[:per_page] = 10000
    _count, @schools = Admins::SchoolDailyStatisticService.call(params)

    filename = ['学校统计总表', params[:keyword], Time.zone.now.strftime('%Y%m%d%H%M%S')].join('-') << '.xlsx'
    render xlsx: 'export', filename: filename
  end

  private

  def load_statistic_total
    @teacher_total         = User.joins(:user_extension).where(user_extensions: { identity: :teacher }).count
    @student_total         = User.joins(:user_extension).where(user_extensions: { identity: :student }).count
    @course_total          = Course.count
    @active_course_total   = Course.where(is_end: false).count
    @shixun_homework_total = HomeworkCommon.where(homework_type: 4).count
    @other_homework_total  = HomeworkCommon.where(homework_type: [1, 3]).count
    @shixun_total          = Shixun.count
    @shixun_evaluate_total = SchoolReport.sum(:shixun_evaluate_count)
  end
end