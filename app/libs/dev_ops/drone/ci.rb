class DevOps::Drone::Ci
  attr_reader :host, :username, :password, :gitea_username

  # host: drone server's ip
  # username: drone server's account
  # password: drone server's password
  # eq:
  #   DevOps::Drone::Ci.new(@cloud_account.drone_ip, @cloud_account.account, @cloud_account.visible_secret, current_user.login).get_token
  def initialize(host, username, password, gitea_username)
    @host           = host
    @username       = username
    @password       = password
    @gitea_username = gitea_username
  end

  def get_token
    puts "--------- sshpass -p #{password} ssh -o 'StrictHostKeyChecking no' #{username}@#{host} '#{cmd}'"
    `sshpass -p #{password} ssh -o "StrictHostKeyChecking no" #{username}@#{host} "#{cmd}"`
  end

  private
    def cmd
      "cd ..; cd var/lib/drone/; sqlite3 database.sqlite; .dump; select user_hash from users where user_login=#{gitea_username};"
    end
end
