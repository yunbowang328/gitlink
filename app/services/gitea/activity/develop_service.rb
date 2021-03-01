class Gitea::Activity::DevelopService < Gitea::ClientService
  attr_reader :from, :to, :top, :token

  def initialize(from, to, top, token)
    @from = from
    @to = to
    @top = top
    @token = token
  end

  def call
    response = get(url, params)
    render_200_response(response)
  end

  private
  def params
    Hash.new.merge(from: from, to: to, top: top, token: token)
  end

  def url
    "/activity/develop".freeze
  end
end