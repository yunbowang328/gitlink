# == Schema Information
#
# Table name: system_update_notices
#
#  id          :integer          not null, primary key
#  subject     :string(255)
#  notes       :text(65535)
#  start_time  :datetime
#  end_time    :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  notice_type :integer
#

class SystemUpdateNotice < ApplicationRecord
end
