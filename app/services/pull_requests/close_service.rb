class PullRequests::CloseService < ApplicationService
  attr_reader :owner, :repo, :pull, :current_user

  # eq:
  # PullRequests::CloseService.call(owner, repo, pull, current_user)
  def initialize(owner, repo, pull, current_user)
    @owner        = owner
    @repo         = repo
    @pull         = pull
    @current_user = current_user
  end

  def call
    ActiveRecord::Base.transaction do
      return false if close_gitea_pull[:status] != :success

      update_pull_status!
      return true
    end
  end

  private

  def close_gitea_pull
    Gitea::PullRequest::CloseService.call(@owner.login, @repo.identifier,
      @pull.gitea_number, @pull.base, current_user.gitea_token)
  end

  def update_pull_status!
    @pull.update(status: PullRequest::CLOSED)
    @pull.issue.update(status_id: IssueStatus::CLOSED)
  end
end
