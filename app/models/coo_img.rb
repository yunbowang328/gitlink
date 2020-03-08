class CooImg < ApplicationRecord
  extend Enumerize

  enumerize :img_type, in: %i[com_coop edu_coop alliance_coop]
end