class Gitea::PullRequest::UpdateService < Gitea::ClientService
  attr_reader :user, :repo, :params,:pull_request_id


  def initialize(user, repo, params,pull_request_id)
    @user   = user
    @repo   = repo
    @params = params
    @pull_request_id = pull_request_id
  end

  def call
    put(url, request_params)
  end

  private

  def request_params
    Hash.new.merge(token: @user.gitea_token, data: @params)
  end

  def url
    "/repos/#{@user.try(:login)}/#{@repo}/pulls/#{@pull_request_id}".freeze
  end

end
