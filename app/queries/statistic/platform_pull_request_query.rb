class Statistic::PlatformPullRequestQuery < ApplicationQuery
  attr_reader :params 

  def initialize(params)
    @params = params 
  end

  def call 
    pull_request_total_count = PullRequest.count
    pull_request_fresh_count = PullRequest.where("created_at > ? and created_at < ?", start_time, end_time).count

    [pull_request_total_count, pull_request_fresh_count]
  end

  private 
  def start_time
    Time.at(params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i)
  end

  def end_time
    Time.at(params.fetch(:end_time, Time.now.to_i).to_i)
  end
end