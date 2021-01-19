class Projects::TeamsController < Projects::BaseController
  def index
    if @project.owner.is_a?(Organization)
      @teams = @project.owner.teams
    else
      @teams = Team.none
    end
    @teams = paginate(@teams)
  end
end