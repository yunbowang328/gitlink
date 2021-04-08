# == Schema Information
#
# Table name: sponsor_tiers
#
#  id          :integer          not null, primary key
#  tier        :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string(255)      default("")
#  user_id     :integer
#

class SponsorTier < ApplicationRecord
  belongs_to :user

end
