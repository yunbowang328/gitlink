class Ci::ProjectsController < Ci::BaseController
  include RepositoriesHelper
  include Ci::CloudAccountManageable

  before_action :load_project
  before_action :load_repo, only: [:update_trustie_pipeline, :activate, :deactivate]
  before_action :authorize_owner_project!, only: [:authorize]
  before_action :find_cloud_account, only: [:authorize, :activate, :deactivate]

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

  def activate
    return render_error('你还未认证') unless current_user.ci_certification?

    begin
      ActiveRecord::Base.transaction do
        if @repo
          return render_error('该项目已经激活') if @repo.repo_active?
          if @project.ci_reactivate?
            @project.ci_reactivate!(@repo)
            return render_ok
          end
          @repo.activate!(@ci_user.user_id)
        else
          @repo = Ci::Repo.auto_create!(@ci_user, @project)
          @ci_user.update_column(:user_syncing, false)
        end

        result = bind_hook!(current_user, @cloud_account, @repo)
        @project.update_columns(open_devops: true, gitea_webhook_id: result['id'])
        @project.increment!(:open_devops_count)
        @cloud_account.update_column(:ci_user_id, @ci_user.user_id)
      end
      render_ok
    rescue Exception => ex
      render_error(ex.message)
    end
  end

  def deactivate
    return render_error('该项目已经取消激活') if !@repo.repo_active?

    @project.update_column(:open_devops, false)
    @repo.deactivate!
    render_ok
  end

end
