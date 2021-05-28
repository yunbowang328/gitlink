class Users::StatisticsController < Users::BaseController 
  before_action :preload_develop_data, only: [:develop]

  # 近期活动统计
  def activity 
    date_range = (1.week.ago.to_date..Date.today).to_a
    commit_request = Gitea::User::HeadmapService.call(observed_user.login, 1.week.ago.to_date.to_time.to_i, Date.today.to_time.to_i)
    commit_data = commit_request[2]
    @date_data = []
    @issue_data = []
    @pull_request_data = []
    @commit_data = []
    date_range.each do |date|
      @date_data << date.strftime("%Y.%m.%d")
      @issue_data << observed_user.issues.where("DATE(created_on) = ?", date).size
      @pull_request_data << observed_user.pull_requests.where("DATE(created_at) = ?", date).size
      date_commit_data = commit_data.select{|item| item["timestamp"] == date.to_time.to_i}
      @commit_data << (date_commit_data.blank? ? 0 : date_commit_data[0]["contributions"].to_i)
    end
    render :json => {dates: @date_data, issues_count: @issue_data, pull_requests_count: @pull_request_data, commtis_count: @commit_data}
  end

  # 开发能力
  def develop 
    if params[:start_time].present? && params[:end_time].present?
      # 影响力
      @influence = (60.0 + @follow_count / (@follow_count + 10.0) * 40.0).to_i
      @platform_influence = (60.0 + @platform_follow_count / (@platform_follow_count + 10.0) * 40.0).to_i
      # 贡献度
      @contribution = (60.0 + @pullrequest_count / (@pullrequest_count + 10.0) * 40.0).to_i
      @platform_contribution = (60.0 + @platform_pullrequest_count / (@platform_pullrequest_count + 10.0) * 40.0).to_i
      # 活跃度
      @activity = (60.0 + @issues_count / (@issues_count + 10.0) * 40.0).to_i
      @platform_activity = (60.0 + @platform_issues_count / (@platform_issues_count + 10.0) * 40.0).to_i
      # 项目经验
      @experience = 10 * @project_count + 5 * @fork_count + @project_watchers_count + @project_praises_count
      @experience = (60.0 + @experience / (@experience + 100.0) * 40.0).to_i
      @platform_experience = 10 * @platform_project_count + 5 * @platform_fork_count + @platform_project_watchers_count + @platform_project_praises_count
      @platform_experience = (60.0 + @platform_experience / (@platform_experience + 100.0) * 40.0).to_i
      # 语言能力  
      @language = (60.0 + @project_languages_count.length / (@project_languages_count.length + 5.0) * 40.0).to_i
      @platform_language = (60.0 + @platform_project_languages_count.length / (@platform_project_languages_count.length + 5.0) * 40.0).to_i
      # 语言百分比
      @languages_percent = Hash.new
      for key in @project_languages_count.keys do
        @languages_percent[key] = (@project_languages_count[key].to_f / @project_languages_count.values.sum).round(2)
      end
      @platform_languages_percent = Hash.new
      for key in @platform_project_languages_count.keys do
        @platform_languages_percent[key] = (@platform_project_languages_count[key].to_f / @platform_project_languages_count.values.sum).round(2)
      end
      # 各门语言分数
      @each_language_score = Hash.new
      for key in @project_languages_count.keys do
        @each_language_score[key] = (60.0 + @project_languages_count[key] / (@project_languages_count[key] + 5.0) * 40.0).to_i
      end
      @platform_each_language_score = Hash.new
      for key in @platform_project_languages_count.keys do
        @platform_each_language_score[key] = (60.0 + @platform_project_languages_count[key] / (@platform_project_languages_count[key] + 5.0) * 40.0).to_i
      end
    else
      # 影响力
      @influence = (60.0 + @follow_count / (@follow_count + 20.0) * 40.0).to_i 
      @platform_influence = (60.0 + @platform_follow_count / (@platform_follow_count + 20.0) * 40.0).to_i 

      # 贡献度
      @contribution = (60.0 + @pullrequest_count / (@pullrequest_count + 20.0) * 40.0).to_i
      @platform_contribution = (60.0 + @platform_pullrequest_count / (@platform_pullrequest_count + 20.0) * 40.0).to_i

       # 活跃度
      @activity = (60.0 + @issues_count / (@issues_count + 80.0) * 40.0).to_i
      @platform_activity = (60.0 + @platform_issues_count / (@platform_issues_count + 80.0) * 40.0).to_i

      # 项目经验
      @experience = 10 * @project_count + 5 * @fork_count + @project_watchers_count + @project_praises_count
      @experience = (60.0 + @experience / (@experience + 100.0) * 40.0).to_i
      @platform_experience = 10 * @platform_project_count + 5 * @platform_fork_count + @platform_project_watchers_count + @platform_project_praises_count
      @platform_experience = (60.0 + @platform_experience / (@platform_experience + 100.0) * 40.0).to_i
      # 语言能力
      @language = (60.0 + @project_languages_count.length / (@project_languages_count.length + 5.0) * 40.0).to_i
      @platform_language = (60.0 + @platform_project_languages_count.length / (@platform_project_languages_count.length + 5.0) * 40.0).to_i

      # 语言百分比
      @languages_percent = Hash.new
      for key in @project_languages_count.keys do
        @languages_percent[key] = (@project_languages_count[key].to_f / @project_languages_count.values.sum).round(2)
      end
      @platform_languages_percent = Hash.new
      for key in @platform_project_languages_count.keys do
        @platform_languages_percent[key] = (@platform_project_languages_count[key].to_f / @platform_project_languages_count.values.sum).round(2)
      end
      # 各门语言分数
      @each_language_score = Hash.new
      for key in @project_languages_count.keys do
        @each_language_score[key] = (60.0 + @project_languages_count[key] / (@project_languages_count[key] + 5.0) * 40.0).to_i
      end
      @platform_each_language_score = Hash.new
      for key in @platform_project_languages_count.keys do
        @platform_each_language_score[key] = (60.0 + @platform_project_languages_count[key] / (@platform_project_languages_count[key] + 5.0) * 40.0).to_i
      end
    end
    
  end

  # 角色定位
  def role 
    full_member_projects = observed_user.full_member_projects
    owner_projects = filter_member_projects_by_role("Owner")
    manager_projects = filter_member_projects_by_role("Manager").where.not(id: owner_projects.ids)
    developer_projects = filter_member_projects_by_role("Developer").where.not(id: owner_projects.ids + manager_projects.ids)
    reporter_projects = filter_member_projects_by_role("Reporter").where.not(id: owner_projects.ids + manager_projects.ids + developer_projects.ids)

    @full_member_projects_count = full_member_projects.size
    @owner_projects_count = owner_projects.size
    @manager_projects_count = manager_projects.size
    @developer_projects_count = developer_projects.size
    @reporter_projects_count = reporter_projects.size

  end

  # 专业定位
  def major 
    # 参与项目
    join_normal_projects_sql = Project.members_projects(observed_user.id).to_sql
    join_org_projects_sql = Project.joins(team_projects: [team: :team_users]).where(team_users: {user_id: observed_user.id}).to_sql
    # 关注项目
    star_projects_sql = Project.joins(:watchers).where(watchers: {watchable_type: "Project", user_id: observed_user.id}).to_sql 
    # fork项目
    fork_projects_sql = Project.where(id: observed_user.fork_users.select(:id, :fork_project_id).pluck(:fork_project_id)).to_sql 
    major_projects = Project.from("( #{ join_normal_projects_sql} UNION #{ join_org_projects_sql } UNION #{ star_projects_sql } UNION #{fork_projects_sql}) AS projects").distinct
    categories = ProjectCategory.joins(:projects).merge(Project.where(id: time_filter(major_projects, 'created_on'))).distinct.pluck(:name)
    render :json => {categories: categories}
  end

  private 
  def time_filter(collection, time_field) 
    if params[:start_time].present? && params[:end_time].present?
      return collection.where("#{time_field} > ? AND #{time_field} < ?", Time.at(params[:start_time].to_i).beginning_of_day, Time.at(params[:end_time].to_i).end_of_day)
    else 
      return collection
    end
  rescue 
    return collection
  end

  def filter_member_projects_by_role(role)
    case role 
    when 'Owner'
      normal_projects_sql =  Project.joins(members: :roles).where(user_id: observed_user.id).where(members: {user_id: observed_user.id}, roles: {name: 'Manager'}).to_sql 
      org_projects_sql = Project.joins(:owner, teams: :team_users).where(users: {type: 'Organization'}, teams: {authorize: "owner"}, team_users: {user_id: observed_user.id}).to_sql
    when "Manager"
      normal_projects_sql = Project.joins(members: :roles).where.not(user_id: observed_user.id).where(members: {user_id: observed_user.id}, roles: {name: 'Manager'}).to_sql 
      org_projects_sql = Project.joins(:owner, teams: :team_users).where(users: {type: 'Organization'}, teams: {authorize: "admin"}, team_users: {user_id: observed_user.id}).to_sql
    when "Developer"
      normal_projects_sql = Project.joins(members: :roles).where.not(user_id: observed_user.id).where(members: {user_id: observed_user.id}, roles: {name: 'Developer'}).to_sql 
      org_projects_sql = Project.joins(:owner, teams: :team_users).where(users: {type: 'Organization'}, teams: {authorize: "write"}, team_users: {user_id: observed_user.id}).to_sql
    when "Reporter"
      normal_projects_sql = Project.joins(members: :roles).where.not(user_id: observed_user.id).where(members: {user_id: observed_user.id}, roles: {name: 'Reporter'}).to_sql 
      org_projects_sql = Project.joins(:owner, teams: :team_users).where(users: {type: 'Organization'}, teams: {authorize: "read"}, team_users: {user_id: observed_user.id}).to_sql
    end
    return time_filter(Project.from("( #{normal_projects_sql} UNION #{org_projects_sql} ) AS projects").distinct, 'created_on')
  end

  def preload_develop_data
    # 用户被follow数量
    @follow_count = time_filter(Watcher.where(watchable: observed_user), 'created_at').count
    @platform_follow_count = time_filter(Watcher.where(watchable_type: 'User'), 'created_at').count
    # 用户pr数量
    @pullrequest_count = time_filter(PullRequest.where(user_id: observed_user.id), 'created_at').count  
    @platform_pullrequest_count = time_filter(PullRequest, 'created_at').count  
    # 用户issue数量
    @issues_count = time_filter(Issue.where(author_id: observed_user.id), 'created_on').count 
    @platform_issues_count = time_filter(Issue, 'created_on').count
    # 用户总项目数 @fork_count + @project_watchers_count + @project_praises_count
    @project_count = filter_member_projects_by_role("Owner").count  
    @platform_project_count = time_filter(Project, 'created_on').count
    # 用户项目被fork数量
    @fork_count = filter_member_projects_by_role("Owner").sum("forked_count")
    @platform_fork_count = time_filter(Project, 'created_on').sum("forked_count")
    # 用户项目关注数
    @project_watchers_count = filter_member_projects_by_role("Owner").sum("watchers_count")
    @platform_project_watchers_count = time_filter(Project, 'created_on').sum("watchers_count")
    # 用户项目点赞数
    @project_praises_count = filter_member_projects_by_role("Owner").sum("praises_count")
    @platform_project_praises_count = time_filter(Project, 'created_on').sum("praises_count")
    # 用户不同语言项目数量
    @project_languages_count = filter_member_projects_by_role("Owner").joins(:project_language).group("project_languages.name").count
    @platform_project_languages_count = time_filter(Project, 'created_on').joins(:project_language).group("project_languages.name").count
  end
end