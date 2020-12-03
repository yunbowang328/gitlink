# == Schema Information
#
# Table name: pull_request_assigns
#
#  id              :integer          not null, primary key
#  pull_request_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_login      :string(255)
#
# Indexes
#
#  index_pull_request_assigns_on_user_id_and_pull_request_id  (pull_request_id)
#  index_pull_request_assigns_on_user_login                   (user_login)
#

class PullRequestAssign < ApplicationRecord
  belongs_to :user
  belongs_to :pull_request
end
