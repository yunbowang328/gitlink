class AppliedMessage < ApplicationRecord
  belongs_to :user
  belongs_to :applied, polymorphic: true

end