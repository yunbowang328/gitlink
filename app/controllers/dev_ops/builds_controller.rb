class ::DevOps::BuildsController < ApplicationController
  before_action :require_login
  before_action :find_repo

  def index
    cloud_account = @repo.dev_ops_cloud_account
    result = DevOps::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier).builds

    render json: result
  end

  def detail
    cloud_account = @repo.dev_ops_cloud_account
    result = DevOps::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: params[:number]).build

    render json: result
  end

  def restart
    cloud_account = @repo.dev_ops_cloud_account
    result = DevOps::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: params[:number]).restart

    render json: result
  end

  def delete
    cloud_account = @repo.dev_ops_cloud_account
    result = DevOps::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, number: params[:number]).stop
    render json: result
  end

  def logs
    cloud_account = @repo.dev_ops_cloud_account
    result = DevOps::Drone::API.new(cloud_account.drone_token, cloud_account.drone_url, @repo.user.login, @repo.identifier, build: params[:build], stage: params[:stage], step: params[:step]).logs

    render json: result
  end

  private
    def find_repo
      @repo = ::Repository.find params[:id]
    end
end
