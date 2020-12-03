# == Schema Information
#
# Table name: user_day_certifications
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  status     :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_user_day_certifications_on_user_id  (user_id)
#

class UserDayCertification < ApplicationRecord
end
