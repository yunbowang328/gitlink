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

# 首页卡片内容
class Topic::Card < Topic 
end