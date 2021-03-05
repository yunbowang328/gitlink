class Statistic::PlatformUserQuery < ApplicationQuery
  attr_reader :params 

  def initialize(params)
    @params = params 
  end

  def call 
    user_total_count = User.count
    user_active_count = User.where("last_login_on > ? and last_login_on < ?", start_time, end_time).count
    user_fresh_count = User.where("created_on > ? and created_on < ?", start_time, end_time).count

    [user_total_count, user_active_count, user_fresh_count]
  end

  private 
  def start_time
    Time.at(params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i)
  end

  def end_time
    Time.at(params.fetch(:end_time, Time.now.to_i).to_i)
  end
end