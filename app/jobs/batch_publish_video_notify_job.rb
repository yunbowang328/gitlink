# 批量发布视频 消息任务
class BatchPublishVideoNotifyJob < ApplicationJob
  queue_as :notify

  def perform(user_id, video_ids)
    user = User.find_by(id: user_id)
    return if user.blank?

    attrs = %i[user_id trigger_user_id container_id container_type tiding_type status created_at updated_at]

    same_attrs = {
      user_id: 1,
      trigger_user_id: user.id,
      container_type: 'Video',
      tiding_type: 'Apply', status: 0
    }
    Tiding.bulk_insert(*attrs) do |worker|
      user.videos.where(id: video_ids).each do |video|
        worker.add same_attrs.merge(container_id: video.id)
      end
    end
  end
end
