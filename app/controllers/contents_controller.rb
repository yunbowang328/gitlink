class ContentsController < ApplicationController
  before_action :find_user, :find_repository
  before_action :require_login, only: %i[create update_file delete_file]

  def create
    interactor = Gitea::CreateFileInteractor.call(current_user, content_params)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  def update_file
    interactor = Gitea::UpdateFileInteractor.call(current_user, params)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  def delete_file
    interactor = Gitea::DeleteFileInteractor.call(current_user, params)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  private
  def content_params
    params.permit(:login, :repo_identifier, :filepath, :branch, :content, :message, :new_branch)
  end

end
