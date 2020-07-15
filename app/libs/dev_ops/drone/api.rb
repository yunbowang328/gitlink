class DevOps::Drone::API < DevOps::Drone::Request
  attr_reader :drone_token, :drone_url, :owner, :repo, :options

  # drone_token:
  # owner: repo's owner name or login
  # repo: repo's identifier
  def initialize(drone_token, drone_url, owner, repo, options={})
    @drone_token = drone_token
    @drone_url   = drone_url
    @owner       = owner
    @repo        = repo
    @options     = options
  end

  # Build List
  # GET api/repos/{owner}/{name}/builds
  # eq:
  #  DevOps::Drone::API
  def builds
    request(:get, drone_url, "api/repos/#{owner}/#{repo}/builds", drone_token: drone_token)
  end

  # Build Info
  # GET api/repos/{owner}/{name}/builds/{number}
  def build
    request(:get, "api/repos/#{owner}/#{repo}/builds/#{number}", drone_token: drone_token)
  end

  # Update .trustie-pipeline.yml file
  # PATCH api/repos/{owner}/{name}
  def config_yml
    request(:patch, "/api/repos/#{owner}/#{repo}", drone_token: drone_token, config_path: config_path)
  end

  # Activate user's project with Drone CI
  # POST api/repos/{owner}/{name}
  def activate
    request(:post, "/api/repos/#{owner}/#{repo}", drone_token: drone_token)
  end

  # Build Restart
  # POST api/repos/{owner}/{name}/builds/{number}
  # Restart the specified build. Please note this api requires read and write access to the repository and the request parameter {build} is not the build id but the build number.
  def restart
    request(:post, "/api/repos/#{owner}/#{repo}/builds/#{number}", drone_token: drone_token)
  end

  # Build Stop
  # DELETE api/repos/{owner}/{name}/builds/{number}
  # Stop the specified build. Please note this api requires administrative privileges and the request parameter {build} is not the build id but the build number.
  def stop
    request(:delete, "/api/repos/#{owner}/#{repo}/builds/#{number}", drone_token: drone_token)
  end
end
