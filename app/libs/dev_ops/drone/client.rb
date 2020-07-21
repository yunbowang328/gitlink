class DevOps::Drone::Client
  attr_reader :client_id, :drone_ip, :rpc_secret

  # client_id: user's client_id from oauth
  # drone_ip: 云服务器IP地址, eq: 173.65.32.21
  # eq:
  #   DevOps::Drone::Client.new(current_user.oauth.client_id, 'drone_ip').generate_cmd
  def initialize(client_id, drone_ip, rpc_secret)
    @client_id  = client_id
    @drone_ip   = drone_ip
    @rpc_secret = rpc_secret
  end

  def run
    `docker run -d \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -e DRONE_PRC_HOST=drone-server-#{client_id}:9000 \
      -e DRONE_RPC_SECRET=#{rpc_secret} \
      -e DRONE_RUNNER_NAME=#{drone_ip} \
      --restart always \
      --name drone-agent--#{client_id} \
      --net="bridge" \
      drone/drone-runner-docker:1
    `
  end

  def generate_cmd
    "docker run -d \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -e DRONE_RPC_HOST=#{drone_ip}:9000 \
      -e DRONE_RPC_SECRET=#{rpc_secret} \
      -e DRONE_RUNNER_NAME=#{drone_ip} \
      --restart always \
      --name drone-agent--#{client_id} \
      --net='bridge' \
      drone/drone-runner-docker:1"
  end
end
