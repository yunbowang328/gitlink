class DevOps::Drone::Ci
  attr_reader :host, :username, :password

  # host: drone server's ip
  # username: drone server's account
  # password: drone server's password
  # eq:
  #   DevOps::Drone::Ci.new(@cloud_account.drone_ip, @cloud_account.account, @cloud_account.visible_secret).get_token
  def initialize(host, username, password)
    @host     = host
    @username = username
    @password = password
  end

  def get_token
    `sshpass -p #{password} ssh -o "StrictHostKeyChecking no" #{username}@#{host} "#{cmd}"`
  end

  private
    def cmd
      "cd ..; cd var/lib/drone/; sqlite3 database.sqlite; .dump; select user_hash from users where user_login=#{username} "
    end
end
