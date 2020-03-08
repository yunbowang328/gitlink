class Users::VideosController < Users::BaseController
  before_action :private_user_resources!, :check_account
  before_action :require_teacher!
  before_action :require_auth_teacher!, except: [:index, :review]

  helper_method :current_video

  def index
    videos = Users::VideoQuery.call(observed_user, search_params)

    @count  = videos.count
    @videos = paginate videos
  end

  def update
    return render_error('该状态下不能编辑视频信息') unless (current_video.published? || current_video.course_videos.present?)

    current_video.update!(title: params[:title])

    AliyunVod::Service.update_video_info(current_video.uuid, Title: current_video.title) rescue nil
  end

  def cancel
    video = observed_user.videos.find_by(uuid: params[:video_id])
    return render_not_found if video.blank?
    return render_error('该状态下不能删除视频') unless video.pending?

    video.destroy!
    AliyunVod::Service.delete_video([video.uuid]) rescue nil

    render_ok
  end

  def review
    params[:status] = 'processing'
    videos = Users::VideoQuery.call(observed_user, params)

    @count  = videos.count
    @videos = paginate videos
  end

  def get_video_data
    start_time = params[:start_time].to_time.utc.strftime('%Y-%m-%dT%H:%M:%SZ')
    end_time = params[:end_time].to_time.utc.strftime('%Y-%m-%dT%H:%M:%SZ')
    result = AliyunVod::Service.video_data(current_video.uuid, start_time, end_time)
    render :json => {data: result}
  end

  def batch_publish
    Videos::BatchPublishService.call(observed_user, batch_publish_params)
    render_ok
  rescue Videos::BatchPublishService::Error => ex
    render_error(ex.message)
  end

  private

  def current_video
    @_current_video ||= observed_user.videos.find_by(id: params[:id])
    if @_current_video.nil?
      video = Video.find_by(id: params[:id])
      if video.course_videos.present?
        video
      end
    else
      @_current_video
    end
  end

  def search_params
    params.permit(:keyword, :sort_by, :sort_direction)
  end

  def batch_publish_params
    params.permit(videos: %i[video_id title course_id])
  end
end