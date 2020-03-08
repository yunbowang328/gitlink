class Admins::DragCooperativeService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :move, :after

  def initialize(move, after)
    @move  = move
    @after = after # 移动后下一个位置的元素
  end

  def call
    return if move.position + 1 == after&.position # 未移动
    raise Error, '未知错误' if after && move.img_type != after.img_type

    coo_imgs = CooImg.where(img_type: move.img_type)

    ActiveRecord::Base.transaction do
      if after.blank? # 移动至末尾
        total = coo_imgs.count

        coo_imgs.where('position > ?', move.position).update_all('position = position - 1')
        move.update!(position: total)
        return
      end

      if move.position > after.position # 前移
        coo_imgs.where('position >= ? AND position < ?', after.position, move.position).update_all('position = position + 1')
        move.update!(position: after.position)
      else # 后移
        coo_imgs.where('position > ? AND position <= ?', move.position, after.position).update_all('position = position - 1')
        move.update!(position: after.position)
      end
    end
  end
end