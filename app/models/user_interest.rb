# == Schema Information
#
# Table name: user_interests
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  repertoire_id :integer
#
# Indexes
#
#  index_user_interests_on_repertoire_id  (repertoire_id)
#  index_user_interests_on_user_id        (user_id)
#

class UserInterest < ApplicationRecord
  belongs_to :user
  # belongs_to :repertoire
end
