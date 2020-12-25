class License < ApplicationRecord
  include Projectable
  has_many :attachments, as: :container, dependent: :destroy

end
