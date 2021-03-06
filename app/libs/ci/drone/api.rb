class Ci::Drone::API < Ci::Drone::Request
  attr_reader :drone_token, :endpoint, :owner, :repo, :options

  # drone_token:
  # owner: repo's owner name or login
  # repo: repo's identifier
  def initialize(drone_token, endpoint, owner, repo, options={})
    @drone_token = drone_token
    @endpoint    = endpoint
    @owner       = owner
    @repo        = repo
    @options     = options
  end

  # Build List
  # GET api/repos/{owner}/{name}/builds
  # eq:
  #  Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier)
  def builds
    get(endpoint, "api/repos/#{owner}/#{repo}/builds", drone_token: drone_token)
  end

  # Build Info
  # GET api/repos/{owner}/{name}/builds/{number}
  # eq:
  # Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, project.owner.login, project.identifier, number: number).build
  def build
    get(endpoint, "api/repos/#{owner}/#{repo}/builds/#{options[:number]}", drone_token: drone_token)
  end

  # Update .trustie-pipeline.yml file
  # PATCH api/repos/{owner}/{name}\
  # eq:
  #  Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, project.owner.login, project.identifier, config_path: config_path).config_yml
  def config_yml
    patch(endpoint, "/api/repos/#{owner}/#{repo}", drone_token: drone_token, config_path: options[:config_path])
  end

  # Activate user's project with Drone CI
  # POST api/repos/{owner}/{name}
  # eq:
  #  Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, project.owner.login, project.identifier).activate
  def activate
    post(endpoint, "/api/repos/#{owner}/#{repo}", drone_token: drone_token)
  end

  # Build Restart
  # POST api/repos/{owner}/{name}/builds/{number}
  # Restart the specified build. Please note this api requires read and write access to the repository and the request parameter {build} is not the build id but the build number.
  # eq:
  # Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: number).restart
  def restart
    post(endpoint, "/api/repos/#{owner}/#{repo}/builds/#{options[:number]}", drone_token: drone_token)
  end

  # Build Stop
  # DELETE api/repos/{owner}/{name}/builds/{number}
  # Stop the specified build. Please note this api requires administrative privileges and the request parameter {build} is not the build id but the build number.
  # eq:
  # Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: number).stop
  def stop
    delete(endpoint, "/api/repos/#{owner}/#{repo}/builds/#{options[:number]}", drone_token: drone_token)
  end

  # Build Logs
  # GET /api/repos/{owner}/{repo}/builds/{build}/logs/{stage}/{step}
  # Please note this api requires read access to the repository.
  # eq:
  # Ci::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, build: build, stage: stage, step: step).logs
  def logs
    get(endpoint, "/api/repos/#{owner}/#{repo}/builds/#{options[:build]}/logs/#{options[:stage]}/#{options[:step]}", drone_token: drone_token)
  end

  # Synchronize the currently authenticated user???s repository list.
  # POST /api/user/repos
  # eq:
  # Ci::Drone::API.new(drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: number).sync
  def sync_repos
    post(endpoint, "/api/users/repos", drone_token: drone_token)
  end

  # Creates a user.
  # POST /api/users
  def create_user
    post(endpoint, "/api/users", {login: options[:login], email: options[:email], avatar_url:options[:avatar_url],active:true, drone_token: options[:token]})
  end

  # Creates a secret.
  def create_secret
    post(endpoint, "/api/repos/#{owner}/#{repo}/secrets", {name: options[:name], data: options[:data], pull_request:true, drone_token: drone_token})
  end

  # Update a secret.
  def update_secret
    patch(endpoint, "/api/repos/#{owner}/#{repo}/secrets/#{options[:name]}", { data: options[:data], pull_request:true, drone_token: drone_token})
  end

  # list of secrets.
  def secrets
    get(endpoint, "/api/repos/#{owner}/#{repo}/secrets", drone_token: drone_token)
  end

  # delete secret.
  def delete_secret
    delete(endpoint, "/api/repos/#{owner}/#{repo}/secrets/#{options[:name]}", drone_token: drone_token)
  end

end
