class Users::ProjectsController < Users::BaseController
  skip_before_action :check_observed_user_exists!, only: [:search]

  def index
    projects = Users::ProjectService.new(observed_user, query_params).call

    @count = projects.count
    @projects = paginate(projects.includes(:project_score, owner: { user_extension: :school }), special: observed_user.is_teacher?)
  end

  def search
    query_params = { keyword: params[:keyword], category: 'manage' }
    projects = Users::ProjectService.new(current_user, query_params).call

    params[:limit] = params[:per_page].to_i.zero? ? 20 : params[:per_page].to_i
    @count    = projects.count
    @projects = paginate projects
  end

  private

  def query_params
    params.permit(:category, :status, :sort_direction)
  end
end