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
    result = Ci::Drone::API.new(@user.user_hash, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, number: params[:build]).restart

    render json: result
  end

  def stop
    result = Ci::Drone::API.new(@user.user_hash, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, number: params[:build]).stop
    render json: result
  end

  def logs
    result = Ci::Drone::API.new(@user.user_hash, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, build: params[:build], stage: params[:stage], step: params[:step]).logs

    render json: result
  end

  private
    def find_cloud_account
      @cloud_account = current_user.ci_cloud_account
    end

    def load_ci_user
      begin
        @ci_user = Ci::User.find_by(user_login: params[:owner])
      rescue
        render_not_found
      end
    end
end
