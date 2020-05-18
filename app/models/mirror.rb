class Mirror < ApplicationRecord

  #  0 - succeeded, 1 - waiting, 2 - failed
  # 0: 同步镜像成功；1: 正在同步镜像；2: 同步失败，默认值为0
  enum status: { succeeded: 0, waiting: 1, failed: 2 }

  belongs_to :repository


  def set_status!(status=Mirror.statuses[:succeeded])
    update_column(status: status)
  end
end
