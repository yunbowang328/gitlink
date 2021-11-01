class UserRankController < ApplicationController
  # 根据时间获取热门开发者
  def index 
    $redis_cache.zunionstore("recent-days-user-rank", get_timeable_key_names)
    @user_rank = $redis_cache.zrevrange("recent-days-user-rank", 0, 3, withscores: true)
  rescue Exception => e
    @user_rank = []
  end

  private 
  # 默认显示7天的
  def time
    params.fetch(:time, 7).to_i
  end

  def get_timeable_key_names
    names_array = []
    (0...time).to_a.each do |i|
      date_time_string = (Date.today - i.days).to_s
      names_array << "v2-user-rank-#{date_time_string}"
    end
    names_array
  end
end