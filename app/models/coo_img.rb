# == Schema Information
#
# Table name: coo_imgs
#
#  id         :integer          not null, primary key
#  src_states :string(255)
#  url_states :string(255)
#  img_type   :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

class CooImg < ApplicationRecord
  extend Enumerize

  enumerize :img_type, in: %i[com_coop edu_coop alliance_coop]
end
