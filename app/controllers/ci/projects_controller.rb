class Ci::ProjectsController < Ci::BaseController
  include RepositoriesHelper

  before_action :load_project
  before_action :load_repo, only: [:update_trustie_pipeline]
  before_action :authorize_owner_project!, only: [:authorize]
  before_action :find_cloud_account, only: [:authorize]

  def authorize
    @user = current_user
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
      render_result(1, "更新成功")
    else
      render_error(interactor.error)
    end
  end

end