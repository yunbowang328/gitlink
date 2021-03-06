class ProjectRankController < ApplicationController
  # 根据时间获取热门项目
  def index 
    $redis_cache.zunionstore("recent-days-project-rank", get_timeable_key_names)
    deleted_data = $redis_cache.smembers("v2-project-rank-deleted")
    $redis_cache.zrem("recent-days-project-rank", deleted_data) unless deleted_data.blank?
    @project_rank = $redis_cache.zrevrange("recent-days-project-rank", 0, 4, withscores: true)
  rescue Exception => e
    @project_rank = []
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
      names_array << "v2-project-rank-#{date_time_string}"
    end
    names_array
  end
end