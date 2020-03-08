class Admins::SchoolStatisticsController < Admins::BaseController
  before_action :contrast_column_select_options, only: [:contrast]

  def index
    params[:data_type] ||= 'grow'
    params[:sort_by] = params[:sort_by].presence || :teacher_increase_count
    params[:sort_direction] = params[:sort_direction].presence || :desc

    service = Admins::StatisticSchoolDataGrowService.new(params)
    @grow_summary = service.grow_summary

    total_count, statistics = service.call
    @params_page = params[:page] || 1

    @statistics = paginate statistics, total_count: total_count
  end

  def contrast
    params[:contrast_column] = params[:contrast_column].presence || :teacher_increase_count
    params[:sort_direction] ||= :desc
    params[:sort_by] = :percentage

    # 无对比日期时直接返回无数据页面
    if useless_contrast_date_parameter?
      @total_count = 0
      @statistics = paginate([])
      return
    end

    total_count, statistics = Admins::StatisticSchoolContrastDataService.call(params)

    @statistics = paginate statistics, total_count: total_count
  rescue Admins::StatisticSchoolContrastDataService::ParameterError
    render_unprocessable_entity('参数错误')
  end

  private

  def useless_contrast_date_parameter?
    params[:begin_date].blank? && params[:end_date].blank? &&
      params[:other_begin_date].blank? &&params[:other_end_date].blank?
  end

  def contrast_column_select_options
    @select_options =
      Admins::StatisticSchoolContrastDataService::CONTRAST_COLUMN_LIST.map do |column|
        [I18n.t("school_daily_report.#{column}"), column]
      end
  end
end
