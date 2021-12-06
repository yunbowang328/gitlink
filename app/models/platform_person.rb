# == Schema Information
#
# Table name: platform_people
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  image_url    :string(255)
#  announcement :string(255)
#  content      :text(65535)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  fake_login   :string(255)
#

class PlatformPerson < ApplicationRecord

  def image
    image_url('image')
  end

  private

  def image_url(type)
    return nil unless Util::FileManage.exists?(self, type)
    Util::FileManage.source_disk_file_url(self, type)
  end
end
