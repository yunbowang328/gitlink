class Tracker < ApplicationRecord
  has_many :issues
  has_and_belongs_to_many :projects
end