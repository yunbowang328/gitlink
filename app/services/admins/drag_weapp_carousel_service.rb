class Admins::DragWeappCarouselService < ApplicationService
  attr_reader :move, :after

  def initialize(move, after)
    @move  = move
    @after = after # 移动后下一个位置的元素
  end

  def call
    return if move.position + 1 == after&.position # 未移动

    carousels = WeappSettings::Carousel.all

    ActiveRecord::Base.transaction do
      if after.blank? || move.id == after.id # 移动至末尾
        total = carousels.count

        carousels.where('position > ?', move.position).update_all('position = position - 1')
        move.update!(position: total)
        return
      end

      if move.position > after.position # 前移
        carousels.where('position >= ? AND position < ?', after.position, move.position).update_all('position = position + 1')
        move.update!(position: after.position)
      else # 后移
        carousels.where('position > ? AND position < ?', move.position, after.position).update_all('position = position - 1')
        move.update!(position: after.position - 1)
      end
    end
  end
end