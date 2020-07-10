# for oauth2 application
class Oauth < ApplicationRecord
  belongs_to :project
  belongs_to :user
end
