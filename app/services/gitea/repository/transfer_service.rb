class Gitea::Repository::TransferService < Gitea::ClientService
  attr_reader :token, :owner, :repo, :new_owner

  def initialize(token, owner, repo, new_owner)
    @token = token
    @owner = owner
    @repo = repo
    @new_owner = new_owner
  end

  def call
    response = post(url, request_params)
    render_status(response)
  end

  private
  def request_params
    transfer_params = {
        new_owner: new_owner
    }
    Hash.new.merge(token: token, data: transfer_params)
  end

  def url
    "/repos/#{owner}/#{repo}/transfer".freeze
  end
end