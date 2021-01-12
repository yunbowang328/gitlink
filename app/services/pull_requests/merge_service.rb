class PullRequests::MergeService < ApplicationService
  attr_reader :owner, :repo, :pull, :current_user, :params

  # eq:
  # PullRequests::MergeService.call(owner, repo, pull, current_user, params)
  def initialize(owner, repo, pull, current_user, params)
    @owner        = owner
    @repo         = repo
    @pull         = pull
    @current_user = current_user
    @params       = params
  end

  def call
    ActiveRecord::Base.transaction do
      gitea_pull_merge!
    end
  end

  private

  def gitea_pull_merge!
    result = Gitea::PullRequest::MergeService.call(@current_user.gitea_token, @owner.login,
      @repo.identifier, @pull.gpid, gitea_merge_pull_params)

    result[:status] === 200 ? true : false
  end

  def gitea_merge_pull_params
    {
      Do: params[:do],
      MergeMessageField: params[:body],
      MergeTitleField: params[:title]
    }
  end
end
