# Merge a pull request
class Gitea::PullRequest::MergeService < Gitea::ClientService
  attr_reader :user, :repo, :pull_request_id, :params

  # parameters:
  #   repo: name of the repo
  #   pull_request_id: index of the pull request to merge
  #   params:
  #      title: merge标题
  #      message: merge说明
  def initialize(user, repo, pull_request_id, params={})
    @user            = user
    @repo            = repo
    @params          = params
    @pull_request_id = pull_request_id
  end

  def call
    post(url, request_params)
  end

  private
  def url
    "/repos/#{user.login}/#{repo}/pulls/#{pull_request_id}/merge"
  end

  def request_params
    Hash.new.merge(token: user.gitea_token, data: params)
  end

end
