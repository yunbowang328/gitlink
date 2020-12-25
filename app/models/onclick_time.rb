# == Schema Information
#
# Table name: onclick_times
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  onclick_time :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_onclick_times_on_user_id  (user_id)
#

class OnclickTime < ApplicationRecord
  belongs_to :user

end
