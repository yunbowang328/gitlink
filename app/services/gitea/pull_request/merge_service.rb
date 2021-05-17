# Merge a pull request
class Gitea::PullRequest::MergeService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :pull_request_id, :params

  # parameters:
  #   repo: name of the repo
  #   pull_request_id: index of the pull request to merge
  #   params:
  #      title: merge标题
  #      message: merge说明
  # eq: Gitea::PullRequest::MergeService.call(current_user.gitea_token, @repo.owner.lgoin, @repo.identifier, params)
  def initialize(token, owner, repo, pull_request_id, params={})
    @token           = token
    @owner           = owner
    @repo            = repo
    @params          = params
    @pull_request_id = pull_request_id
  end

  def call
    response = post(url, request_params)

    render_gitea_response(response)
  end

  private
  def url
    "/repos/#{owner}/#{repo}/pulls/#{pull_request_id}/merge"
  end

  def request_params
    Hash.new.merge(token: token, data: params.compact)
  end
end
