class Statistic::PlatformCommitQuery < ApplicationQuery
  attr_reader :params, :user

  def initialize(params, user)
    @params = params
    @user = user
  end

  def call
    begin
      result = Gitea::Activity::GetService.call(start_time, end_time, user.gitea_token)
      result = result["commit"]

      return [result["total_count"], result["active_count"]]
    rescue
      return [0, 0]
    end
  end

  private 
  def start_time
    params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i
  end

  def end_time
    params.fetch(:end_time, Time.now.to_i).to_i
  end
end