class ForgeActivity < ApplicationRecord
  belongs_to :user
  belongs_to :project
  belongs_to :forge_act, polymorphic: true
end