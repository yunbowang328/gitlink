# == Schema Information
#
# Table name: ci_cloud_accounts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  ip_num     :integer
#  account    :string(255)
#  secret     :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ci_user_id :integer
#
# Indexes
#
#  dev_ops_cloud_accounts_p_u_ip  (user_id,ip_num)
#

class Ci::CloudAccount < Ci::LocalBase
  belongs_to :user
  belongs_to :ci_user, class_name: 'Ci::User', foreign_key: :ci_user_id, optional: true

  def drone_host
    [drone_ip, ":80"].join
  end

  def drone_ip
    IPAddr.new(self.ip_num, Socket::AF_INET).to_s
  end

  def drone_url
    ["http://", self.drone_host].join
  end

  def visible_secret
    Base64.decode64(secret)
  end

  def self.encrypted_secret(str)
     Base64.encode64(str.strip).gsub(/\n/, '')
  end

  def authenticate_url
    [drone_url, '/login'].join
  end

end
