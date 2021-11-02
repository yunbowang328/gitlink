# == Schema Information
#
# Table name: topics
#
#  id          :integer          not null, primary key
#  type        :string(255)
#  title       :string(255)
#  uuid        :integer
#  image_url   :string(255)
#  url         :string(255)
#  order_index :integer
#

class Topic < ApplicationRecord

  default_scope { order(order_index: :desc)}

  def image
    image_url('image')
  end

  private

  def image_url(type)
    return nil unless Util::FileManage.exists?(self, type)
    Util::FileManage.source_disk_file_url(self, type)
  end

end
