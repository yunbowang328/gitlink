module AcceptsNestedAttributesHelper
  extend ActiveSupport::Concern

  def build_accepts_nested_attributes(obj, relations, data)
    # 新记录，全部为创建
    return data if obj.new_record?

    # 更新时，需要处理删除数据
    old_ids = relations.loaded? ? relations.map(&:id) : relations.pluck(:id)
    new_ids =
      data.map do |item|
        yield(item) if block_given?

        # 处理参数中错误的ID
        item[:id] = item[:id].to_i
        item[:id] = nil if item[:id].zero? || !old_ids.include?(item[:id])
        item[:id]
      end
    new_ids.compact!

    # 被删除的子项ID数组
    destroy_ids = old_ids - new_ids
    destroy_attributes = destroy_ids.map { |id| { id: id, _destroy: true } }

    data.concat(destroy_attributes)
  end
end