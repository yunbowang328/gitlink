class Gitea::User::HeadmapService < Gitea::ClientService
  attr_reader :start_time, :end_time, :username 

  def initialize(username, start_time, end_time)
    @username = username 
    @start_time = start_time 
    @end_time = end_time
  end

  def call 
    response = get(url, params)
    render_response(response)
  end

  private 
  def params 
    Hash.new.merge(start: start_time, end: end_time)
  end

  def url 
    "/users/#{username}/heatmap".freeze
  end
end