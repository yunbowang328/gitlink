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

  def update_trustie_pipeline
    interactor = Gitea::UpdateFileInteractor.call(current_user.gitea_token, params[:owner], params.merge(identifier: @project.identifier))
    if interactor.success?
      @file = interactor.result
      Ci::Drone::API.new(current_user.cloud_account.drone_token, current_user.cloud_account.endpoint, params[:owner], @project.identifier, config_path: '.trustie-pipeline.yml').config_yml
      render_result(1, "更新成功")
    else
      render_error(interactor.error)
    end
  end

end
