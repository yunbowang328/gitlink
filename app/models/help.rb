# == Schema Information
#
# Table name: helps
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  about_us    :text(65535)
#  agreement   :text(65535)
#  status      :text(65535)
#  help_center :text(65535)
#  join_us     :text(65535)
#

class Help < ApplicationRecord

end
