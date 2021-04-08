class StatisticController < ApplicationController 

  # 平台概况
  def platform_profile
    @platform_user_query = Statistic::PlatformUserQuery.new(params).call
    @platform_project_query = Statistic::PlatformProjectQuery.new(params).call
    @platform_course_query = Statistic::PlatformCourseQuery.new(params).call
  end

  # 平台代码提交数据
  def platform_code
    @platform_pull_request_query = Statistic::PlatformPullRequestQuery.new(params).call
    @platform_commit_query = Statistic::PlatformCommitQuery.new(params,current_user).call
  end

  # 项目案例活跃度排行榜
  def active_project_rank
    @active_project_rank_query = Statistic::ActiveProjectRankQuery.new(params, current_user).call
  end

  # 开发者活跃度排行榜
  def active_developer_rank
    @active_developer_rank_query = Statistic::ActiveDeveloperRankQuery.new(params, current_user).call
  end
end