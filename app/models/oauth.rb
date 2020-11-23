# == Schema Information
#
# Table name: oauths
#
#  id               :integer          not null, primary key
#  client_id        :string(255)
#  client_secret    :string(255)
#  code             :string(255)
#  redirect_uri     :string(255)
#  scope            :string(255)
#  access_token     :string(255)
#  refresh_token    :string(255)
#  token_created_at :integer
#  token_expires_in :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer          default("0")
#  gitea_oauth_id   :integer
#  project_id       :integer
#
# Indexes
#
#  index_oauths_on_user_id  (user_id)
#

# for oauth2 application
class Oauth < ApplicationRecord
  belongs_to :user
end
