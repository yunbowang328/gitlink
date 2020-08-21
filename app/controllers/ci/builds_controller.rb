class Ci::BuildsController < Ci::BaseController
  include RepositoriesHelper
  include Devopsable

  before_action :load_repo
  before_action :find_cloud_account, except: [:index, :show]

  def index
    scope = @repo.builds

    scope = Ci::Builds::ListQuery.call(@repo, params)

    @total_count = scope.map(&:build_id).size
    @builds = paginate scope
  end

  def show
    @build = @repo.builds.includes(stages: [:steps]).find_by(build_number: params[:build])
  end

  def restart
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, number: params[:number]).restart

    render json: result
  end

  def stop
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, number: params[:number]).stop
    render json: result
  end

  def logs
    result = Ci::Drone::API.new(@cloud_account.drone_token, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, build: params[:number], stage: params[:stage], step: params[:step]).logs

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
    def find_cloud_account
      @cloud_account = current_user.cloud_account
    end

    def load_ci_user
      begin
        @ci_user = Ci::User.find_by(user_login: params[:owner])
      rescue
        render_not_found
      end
    end
end
