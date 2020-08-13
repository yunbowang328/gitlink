class Ci::BuildsController < Ci::BaseController
  include RepositoriesHelper

  before_action :find_project, :find_cloud_account
  before_action :find_cloud_account, except: :get_trustie_pipeline
  before_action :ci_authorize!

  def index
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier).builds

    render json: result
  end

  def detail
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier, number: params[:number]).build

    render json: result
  end

  def restart
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier, number: params[:number]).restart

    render json: result
  end

  def delete
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier, number: params[:number]).stop
    render json: result
  end

  def logs
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @project.owner.login, @project.identifier, build: params[:number], stage: params[:stage], step: params[:step]).logs

    render json: result
  end

  # get .trustie-pipeline.yml file
  def get_trustie_pipeline
    file_path_uri = URI.parse('.trustie-pipeline.yml')
    interactor = Repositories::EntriesInteractor.call(@project.owner, @project.identifier, file_path_uri, ref: params[:ref] || "master")
    if interactor.success?
      file = interactor.result
      return render json: {} if file[:status]

      json = {name: file['name'], path: file['path'], sha: file['sha'], content: render_decode64_content(file['content'])}
      render json: json
    end
  end

  private
    def find_project
      @project = Project.find params[:project_id]
    end

    def find_cloud_account
      @cloud_account = @project.ci_cloud_account
    end
end
