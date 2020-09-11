class Ci::BuildsController < Ci::BaseController
  include RepositoriesHelper

  before_action :load_project
  before_action :authorize_owner_project!
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
    # TODO **待优化**
    # 因直接操作ci库，如下查询待优化，可直接根据log id查询即可
    build = @repo.builds.find_by(build_number: params[:build])
    return render_not_found("Couldn't found build with 'number'= #{params[:build]}") if build.blank?

    stage = build.stages.includes(steps: [:log]).find_by(stage_number: params[:stage])
    return render_not_found("Couldn't found build with 'number'= #{params[:stage]}") if stage.blank?

    step = stage.steps.find_by(step_number: params[:step])
    return render_not_found("Couldn't found build with 'number'= #{params[:step]}") if step.blank?

    log = step.log

    result = log.blank? ? nil : (log.log_data[0..5].include?('null') ? nil : JSON.parse(log.log_data))

    # result = Ci::Drone::API.new(@user.user_hash, @cloud_account.drone_url, @repo.repo_namespace, @repo.repo_name, build: params[:build], stage: params[:stage], step: params[:step]).logs

    render json: result
  end
end
