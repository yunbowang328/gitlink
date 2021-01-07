class Gitea::Activity::GetService < Gitea::ClientService
  attr_reader :from, :to, :token

  def initialize(from, to, token)
    @from = from
    @to = to
    @token = token
  end

  def call
    response = get(url, params)
    render_200_response(response)
  end

  private
  def params
    Hash.new.merge(from: from, to: to, token: token)
  end

  def url
    "/activity".freeze
  end
end