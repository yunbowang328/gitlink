class Admins::UserStatisticsController < Admins::BaseController
  def index
    default_sort('finish_shixun_count', 'desc')

    total_count, users = Admins::UserStatisticQuery.call(params)

    @users = paginate users, total_count: total_count
  end

  def export
    default_sort('finish_shixun_count', 'desc')

    params[:per_page] = 10000
    _count, @users = Admins::UserStatisticQuery.call(params)

    filename = ['用户实训情况', Time.zone.now.strftime('%Y%m%d%H%M%S')].join('-') << '.xlsx'
    render xlsx: 'export', filename: filename
  end
end