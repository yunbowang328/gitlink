class Admins::VideoAppliesController < Admins::BaseController

  def index
    params[:status] ||= 'pending'
    status = params[:status]
    if status == 'all'
      status = %w(agreed refused)
    end

    applies = VideoApply.where(status: status).order('video_applies.updated_at desc')

    search = params[:keyword].to_s.strip
    if search.present?
      applies = applies.joins(:video)
                  .where('videos.title like :search', search: "%#{search}%")
    end

    @video_applies = paginate applies.includes(video: { user: :user_extension })
  end

  def agree
    Videos::AgreeApplyService.new(current_video_apply, current_user).call
    render_success_js
  rescue Videos::AgreeApplyService::Error => e
    render json: { status: -1, message: e.message }
  end

  def refuse
    Videos::RefuseApplyService.new(current_video_apply, current_user, reason: params[:reason]).call
    render_success_js
  rescue Videos::RefuseApplyService::Error => e
    render json: { status: -1, message: e.message }
  end

  private

  def current_video_apply
    @_current_video_apply ||= VideoApply.find(params[:id])
  end
end

