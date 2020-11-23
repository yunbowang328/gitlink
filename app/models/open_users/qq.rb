# == Schema Information
#
# Table name: open_users
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  type       :string(255)
#  uid        :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  extra      :text(65535)
#
# Indexes
#
#  index_open_users_on_type_and_uid  (type,uid) UNIQUE
#  index_open_users_on_user_id       (user_id)
#

class OpenUsers::QQ < OpenUser
  def nickname
    extra&.[]('nickname')
  end

  def en_type
    'qq'
  end
end
