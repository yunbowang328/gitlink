# == Schema Information
#
# Table name: platform_communicates
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  content     :text(65535)
#  tag_field   :text(65535)
#  fake_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  order_index :integer          default("0")
#

class PlatformCommunicate < ApplicationRecord
end
