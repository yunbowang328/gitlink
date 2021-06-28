class PullRequests::OpenService < ApplicationService
  attr_reader :owner, :repo, :pull, :current_user

  # eq:
  # PullRequests::OpenService.call(owner, repo, pull, current_user)
  def initialize(owner, repo, pull, current_user)
    @owner        = owner
    @repo         = repo
    @pull         = pull
    @current_user = current_user
  end

  def call
    ActiveRecord::Base.transaction do
      return false if open_gitea_pull[:status] != :success

      update_pull_status!
      return true
    end
  end

  private

  def open_gitea_pull
    Gitea::PullRequest::OpenService.call(@owner.login, @repo.identifier,
      @pull.gitea_number, @pull.base, @current_user.gitea_token)
  end

  def update_pull_status!
    @pull.update(status: PullRequest::OPEN)
    @pull.issue.update(status_id: IssueStatus::SOLVING)
  end
end
