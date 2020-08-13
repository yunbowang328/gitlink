class Ci::CloudAccount < ApplicationRecord
  belongs_to :project
  belongs_to :user
  belongs_to :repository, foreign_key: :repo_id

  def drone_host
    [drone_ip, ":80"].join
  end

  def drone_ip
    IPAddr.new(self.ip_num, Socket::AF_INET).to_s
  end

  def drone_url
    ["http://", drone_host].join
  end

  def visible_secret
    Base64.decode64(secret)
  end

  def self.encrypted_secret(str)
     Base64.encode64(str.strip).gsub(/\n/, '')
  end

end
