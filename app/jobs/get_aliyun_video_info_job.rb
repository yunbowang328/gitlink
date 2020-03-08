# 获取阿里云视频信息
class GetAliyunVideoInfoJob < ApplicationJob
  queue_as :default

  def perform(vod_video_id)
    video = Video.find_by(uuid: vod_video_id)
    return if video.blank? || video.vod_uploading?

    result = AliyunVod::Service.get_play_info(video.uuid)
    cover_url = result.dig('VideoBase', 'CoverURL')
    file_url  = (result.dig('PlayInfoList', 'PlayInfo') || []).first&.[]('PlayURL')

    video.cover_url = cover_url if cover_url.present? && video.cover_url.blank?
    video.file_url  = file_url if file_url.present?
    video.save!
  end
end