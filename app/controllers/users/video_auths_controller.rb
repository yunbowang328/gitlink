class Users::VideoAuthsController < Users::BaseController
  before_action :private_user_resources!, :check_account, :require_auth_teacher!

  def create
    result = Videos::CreateAuthService.call(observed_user, create_params)
    render_ok(data: result)
  rescue Videos::CreateAuthService::Error => ex
    render_error(ex.message)
  end

  def update
    video = observed_user.videos.find_by(uuid: params[:video_id])
    return render_error('该视频凭证不存在') if video.blank?

    result = AliyunVod::Service.refresh_upload_video(video.uuid)
    render_ok(data: result)
  rescue AliyunVod::Error => _
    render_error('刷新上传凭证失败')
  end

  private

  def create_params
    params.permit(:title, :file_name, :file_size, :description, :cover_url)
  end
end