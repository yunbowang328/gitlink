# == Schema Information
#
# Table name: mirrors
#
#  id               :integer          not null, primary key
#  repo_id          :integer
#  status           :integer          default("0"), not null
#  interval         :integer
#  next_update_time :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  sync_num         :integer          default("1")
#

class Mirror < ApplicationRecord

  #  0 - succeeded, 1 - waiting, 2 - failed
  # 0: 同步镜像成功；1: 正在同步镜像；2: 同步失败; 默认值为0
  enum status: { succeeded: 0, waiting: 1, failed: 2 }

  after_update :websocket_boardcast, if: :saved_change_to_status?

  belongs_to :repository, foreign_key: :repo_id

  def set_status!(status=Mirror.statuses[:succeeded])
    update_column(:status, status)
  end

  def numerical_for_status
    self.class.name.constantize.statuses["#{self.status}"]
  end

  private
    def websocket_boardcast
      BroadcastMirrorRepoMsgJob.perform_later(self.repository.id)
    end
end
