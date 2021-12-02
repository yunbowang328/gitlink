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
#

class PlatformPerson < ApplicationRecord
end
