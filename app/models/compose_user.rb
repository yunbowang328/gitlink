# == Schema Information
#
# Table name: compose_users
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  compose_id :integer
#  is_manager :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_compose_users_on_user_id_and_compose_id  (user_id,compose_id)
#

class ComposeUser < ApplicationRecord
  belongs_to :compose
  belongs_to :user
end
