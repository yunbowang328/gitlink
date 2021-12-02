class Competition < ApplicationRecord

  enum status: {archived: 0, active: 1}
end