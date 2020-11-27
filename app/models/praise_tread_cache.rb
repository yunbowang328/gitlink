# == Schema Information
#
# Table name: praise_tread_caches
#
#  id          :integer          not null, primary key
#  object_id   :integer          not null
#  object_type :string(255)
#  praise_num  :integer
#  tread_num   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class PraiseTreadCache < ApplicationRecord
end
