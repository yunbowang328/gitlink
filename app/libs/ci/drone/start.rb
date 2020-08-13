class Ci::Drone::Start
  attr_reader :drone_username, :drone_password, :drone_host, :drone_server_cmd, :drone_client_cmd

  # drone_username="XXXX" 云服务器登录用户名
  # drone_password="XXXXX" 云服务器用户密码
  # drone_host="" 云服务器地址
  # eq:
  # drone_server_cmd = DevOps::Drone::Server.new('client_id', 'client_secret', 'drone_url').generate_cmd
  # drone_client_cmd = DevOps::Drone::Client.new('client_id', 'server_url').generate_cmd
  # DevOps::Drone::Start.new(drone_username, drone_password, 'drone_host', drone_server_cmd, drone_client_cmd).run
  def initialize(drone_username, drone_password, drone_host, drone_server_cmd, drone_client_cmd)
    @drone_username     = drone_username
    @drone_password     = drone_password
    @drone_host         = drone_host
    @drone_server_cmd   = drone_server_cmd
    @drone_client_cmd   = drone_client_cmd
  end

  def run
    `sshpass -p #{drone_password} ssh -o "StrictHostKeyChecking no" #{drone_username}@#{drone_host} "#{drone_server_cmd} && #{drone_client_cmd}"`
  end
end
