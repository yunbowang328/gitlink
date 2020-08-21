class Ci::ProjectsController < Ci::BaseController
  include Devopsable

  before_action :load_project

  def authorize
    @user = current_user
    limit_project_owner_can_devops!(@user, @project)

    if request.put?
      @user.set_drone_step!(User::DEVOPS_VERIFIED)
      render_ok
    end
    @cloud_account = @user.ci_cloud_account
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

end
