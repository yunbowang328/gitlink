class Home::PlatformStatisticsController < ApplicationController

  def index
    @platform_statistic = PlatformStatistic.data 
    @project_statistic = ProjectStatistic.data
    @platform_statistic.increment!(:visits)
    @tasks_count = ActiveRecord::Base.connection.exec_query("SELECT COUNT(*) FROM tasks").rows[0][0]
    @memos_count = ActiveRecord::Base.connection.exec_query("SELECT COUNT(*) FROM memos").rows[0][0]
  end
end