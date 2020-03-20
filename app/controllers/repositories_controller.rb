class RepositoriesController < ApplicationController
  include ApplicationHelper
  before_action :find_project_identifier
  before_action :find_repository_with_project
  before_action :find_user, :authorizate!
  before_action :require_login, only: %i[edit]

  def show
    @branches_count = Gitea::Repository::BranchesService.new(@user, @repo.identifier).call&.size
    @commits_count = Gitea::Repository::Commits::ListService.new(@user, @repo.identifier).call[:total_count]
    @result = Gitea::Repository::GetService.new(@user, @repo.identifier).call
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def entries
    Rails.logger.info("##############_________project_id_________############{@project.id}")
    @project.increment!(:visits)
    Rails.logger.info("##############___________@repo.identifier_______############{@repo.identifier}")
    Rails.logger.info("##############___________@user_______############{@user.login}")

    @ref = params[:branch] || "master"
    @entries = Gitea::Repository::Entries::ListService.new(@user, @repo.identifier, ref:@ref).call
    Rails.logger.info("##############__________@entries______############{@entries}")

    @entries = @entries.sort_by{ |hash| hash['type'] }
  end

  def sub_entries
    file_path_uri = URI.parse(URI.encode(params[:filepath].to_s.strip))
    interactor = Repositories::EntriesInteractor.call(@user, @repo.identifier, file_path_uri, ref: params[:ref])
    if interactor.success?
      @sub_entries = interactor.result
      @sub_entries = [] << @sub_entries unless @sub_entries.is_a? Array
      @sub_entries = @sub_entries.sort_by{ |hash| hash['type'] }
    else
      render_error(interactor.error)
    end
  end

  def commits
    @hash_commit = Gitea::Repository::Commits::ListService.new(@user, @repo.identifier, sha: params[:sha], page: params[:page]).call
  end

  def single_commit
    @commit = Gitea::Repository::Commits::GetService.new(@user, @repo.identifier, params[:sha]).call
  end

  def tags
    @tags = Gitea::Repository::Tags::ListService.new(@user, @repo.identifier).call
  end

  def edit
  end

  private
  def authorizate!
    if @repo.hidden? && @repo.user != current_user
      render_forbidden
    end
  end

  def find_project_identifier
    @project = Project.find_by(id: params[:repo_identifier])
    render_not_found("未找到’#{params[:repo_identifier]}’相关的项目") unless @project
  end

  def find_repository_with_project
    @repo = @project.repository
    render_not_found("未找到’#{params[:repo_identifier]}’相关的仓库") unless @repo
  end
end
