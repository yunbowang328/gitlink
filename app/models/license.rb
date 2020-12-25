# == Schema Information
#
# Table name: licenses
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  content    :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class License < ApplicationRecord
  include Projectable
  has_many :attachments, as: :container, dependent: :destroy

end
