# == Schema Information
#
# Table name: laboratory_users
#
#  id            :integer          not null, primary key
#  laboratory_id :integer
#  user_id       :integer
#
# Indexes
#
#  index_laboratory_users_on_laboratory_id  (laboratory_id)
#  index_laboratory_users_on_user_id        (user_id)
#

class LaboratoryUser < ApplicationRecord
  belongs_to :laboratory
  belongs_to :user
end
