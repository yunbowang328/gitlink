class Statistic::ActiveDeveloperRankQuery < ApplicationQuery
  attr_reader :params, :user

  def initialize(params, user)
    @params = params
    @user = user
  end

  def call
    begin
      result = Gitea::Activity::DevelopService.call(start_time, end_time, top, user.gitea_token)

      return result["develop"]
    rescue
      return []
    end
  end

  private
  def start_time
    params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i
  end

  def end_time
    params.fetch(:end_time, Time.now.to_i).to_i
  end

  def top
    top = params.fetch(:top, 5).to_i
    top = top >= 20 ? 20 : top
    top = top <= 0 ? 5 : top
    top
  end
end