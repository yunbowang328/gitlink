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
end
