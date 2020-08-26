class Ci::Drone::Server
  attr_reader :client_id, :client_secret, :drone_host, :rpc_secret

  # client_id: user's client_id from oauth
  # client_secret: user's client_id from oauth
  # drone_host: 云服务器地址，eq: 173.53.21.31:80
  # eg:
  # DevOps::Drone::Server.new(current_user.oauth.client_id, current_user.oauth.client_secret, 'drone_host').generate_cmd
  def initialize(client_id, client_secret, drone_host, rpc_secret)
    @client_id     = client_id
    @drone_host    = drone_host
    @rpc_secret    = rpc_secret
    @client_secret = client_secret
  end

  # TODO 一下代码方便测试，正式环境请移除
  #   docker rm -f `docker ps -qa`
  def generate_cmd
    "service docker start; docker run \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -e DRONE_DATABASE_DRIVER=mysql \
      -e DRONE_DATABASE_DATASOURCE=#{database_username}:#{database_password}@tcp\\(#{database_host}:#{database_port}\\)/drone?parseTime=true \
      -e DRONE_GITEA_SERVER=#{gitea_url} \
      -e DRONE_GITEA_CLIENT_ID=#{client_id} \
      -e DRONE_GITEA_CLIENT_SECRET=#{client_secret} \
      -e DRONE_RPC_SECRET=#{rpc_secret} \
      -e DRONE_SERVER_HOST=#{drone_host} \
      -e DRONE_SERVER_PROTO=http \
      -p '80:80' \
      --restart=always \
      --detach=true \
      --name=drone-server-#{client_id} \
      --net='bridge' \
      drone/drone:1"
  end

  private
    def gitea_url
      Gitea.gitea_config[:domain]
    end

    def database_username
      database_config[Rails.env]["ci_server_db"]["username"]
    end

    def database_password
      database_config[Rails.env]["ci_server_db"]["password"]
    end

    def database_host
      database_config[Rails.env]["ci_server_db"]["host"]
    end

    def database_port
      database_config[Rails.env]["ci_server_db"]["port"] || 3306
    end

    def database
      database_config[Rails.env]["ci_server_db"]["database"]
    end

    def database_config
      Rails.configuration.database_configuration
    end
end
