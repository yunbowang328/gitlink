class RepositoriesController < ApplicationController
  include ApplicationHelper
  before_action :require_login, only: %i[edit update create_file update_file delete_file]
  before_action :find_project, :authorizate!

  def show
    @branches_count = Gitea::Repository::BranchesService.new(@project.owner, @project.identifier).call&.size
    @commits_count = Gitea::Repository::Commits::ListService.new(@project.owner, @project.identifier).call[:total_count]
    @result = Gitea::Repository::GetService.new(@project.owner, @project.identifier).call
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def entries
    @project.increment!(:visits)

    @ref = params[:branch] || "master"
    @entries = Gitea::Repository::Entries::ListService.new(@project.owner, @project.identifier, ref: @ref).call
    @entries = @entries.sort_by{ |hash| hash['type'] }
  end

  def sub_entries
    file_path_uri = URI.parse(URI.encode(params[:filepath].to_s.strip))
    interactor = Repositories::EntriesInteractor.call(@project.owner, @project.identifier, file_path_uri, ref: params[:ref])
    if interactor.success?
      @sub_entries = interactor.result
      @sub_entries = [] << @sub_entries unless @sub_entries.is_a? Array
      @sub_entries = @sub_entries.sort_by{ |hash| hash['type'] }
    else
      render_error(interactor.error)
    end
  end

  def commits
    @hash_commit = Gitea::Repository::Commits::ListService.new(@project.owner, @project.identifier, sha: params[:sha], page: params[:page]).call
  end

  def single_commit
    @commit = Gitea::Repository::Commits::GetService.new(@project.owner, @project.identifier, params[:sha]).call
  end

  def tags
    @tags = Gitea::Repository::Tags::ListService.new(@project, @project.identifier).call
  end

  def edit
  end

  def create_file
    interactor = Gitea::CreateFileInteractor.call(current_user, content_params)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  def update_file
    interactor = Gitea::UpdateFileInteractor.call(current_user, params.merge(identifier: @project.identifier).compact)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  def delete_file
    interactor = Gitea::DeleteFileInteractor.call(current_user, params.merge(identifier: @project.identifier).compact)
    if interactor.success?
      @file = interactor.result
    else
      render_error(interactor.error)
    end
  end

  private

  def find_project
    @project = Project.find params[:id]
    # render_not_found("未找到相关的仓库") unless @project
  end

  def authorizate!
    if @project.repository.hidden? && !@project.member?(current_user)
      render_forbidden
    end
  end

  def content_params
    {
      filepath: params[:filepath],
      branch: params[:branch],
      new_branch: params[:new_branch],
      content: params[:content],
      message: params[:message],
      identifier: @project.identifier
    }
  end

end
