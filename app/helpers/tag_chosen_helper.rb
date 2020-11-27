module TagChosenHelper
  def get_associated_data(project)
    issue_comment_users_array = []
    cost_time_array = []
    all_issues = []
    {
      "assign_user": render_cache_collaborators(project),
      "tracker": render_cache_trackers,
      "issue_status": render_cache_issue_statuses,
      "priority": render_cache_issue_priorities,
      "issue_version": render_cache_milestones(project),
      "start_date": "",
      "due_date": "",
      "joins_users": issue_comment_users_array,
      "cost_time_users": cost_time_array,
      # "total_cost_time": Time.at(all_cost_time).utc.strftime('%H h %M min %S s'),
      # "be_depended_issues": be_depended_issues_array,
      # "depended_issues":depended_issues_array,
      # "estimated_hours": issue_info[7],
      "done_ratio": render_complete_percentage,
      "issue_tag": render_issue_tags(project),
      "issue_type": render_issue_species,
      "all_issues": all_issues
    }
  end

  def render_cache_trackers
    cache_key = "all_trackers/#{Tracker.maximum('id')}"

    Rails.cache.fetch(cache_key) do
      Tracker.select(:id, :name, :position).collect do |event|
        {
          id: event.id,
          name: event.name,
          position: event.position,
          is_chosen: '0'
        }
      end
    end
  end

  def render_cache_issue_statuses
    cache_key = "all_issue_statuses/#{IssueStatus.maximum('id')}"

    Rails.cache.fetch(cache_key) do
      IssueStatus.select(:id, :name, :position).collect do |event|
        {
          id: event.id,
          name: event.name,
          position: event.position,
          is_chosen: '0'
        }
      end
    end
  end

  def render_cache_issue_priorities
    cache_key = "all_issue_priorities/#{IssuePriority.maximum('id')}"

    Rails.cache.fetch(cache_key) do
      IssuePriority.select(:id, :name, :position).collect do |event|
        {
          id: event.id,
          name: event.name,
          position: event.position,
          is_chosen: '0'
        }
      end
    end
  end

  def render_complete_percentage
    completion_nums = %w(0 10 20 30 40 50 60 70 80 90 100)
    completion_nums.collect do |event|
      {
        id: event.to_i,
        name: event + "%",
        is_chosen: '0'
      }
    end
  end

  def render_issue_species
    species = %W(普通 悬赏)

    species.collect do |event|
      {
        id: event.to_i + 1,
        token: nil,
        is_chosen: '0'
      }
    end
  end

  def render_issue_tags(project)
    # project.issue_tags.last&.cache_key
    cache_key = "all_issue_tags/#{project.issue_tags.maximum('updated_at')}"

    Rails.cache.fetch(cache_key) do
      project.issue_tags.select(:id, :name, :color).collect do |event|
        {
          id: event.id,
          name: event.name,
          color: event.color,
          is_chosen: '0'
        }
      end
    end
  end

  def render_cache_milestones(project)
    cache_key = "all_milestones/#{project.versions.maximum('updated_on')}"

    Rails.cache.fetch(cache_key) do
      project.versions.select(:id, :name, :status).collect do |event|
        {
          id: event.id,
          name: event.name,
          status: event.status,
          is_chosen: '0'
        }
      end
    end
  end

  def render_cache_collaborators(project)
    cache_key = "all_collaborators/#{project.members.maximum('created_on')}"

    Rails.cache.fetch(cache_key) do
      project.members.includes(:user).collect do |event|
        {
          id: event.user&.id,
          name: event.user&.show_real_name,
          avatar_url: url_to_avatar(event.user),
          is_chosen: '0'
        }
      end
    end
  end


  def issue_left_chosen(project,issue_id)
    issue_info = Array.new(11)
    use_tags = []
    issue_comment_users_array = []
    cost_time_array = []
    all_cost_time = 0
    be_depended_issues_array = []
    depended_issues_array = []
    all_issues = []
    depended_issues_id = []
    if issue_id.present?
      issue = Issue.find(issue_id)
      use_tags = issue.issue_tags.select(:id).pluck(:id)
      select_arrays = [:assigned_to_id, :tracker_id, :status_id, :priority_id, :fixed_version_id, :start_date, :due_date, :estimated_hours, :done_ratio, :issue_type, :token]
      issue_info = Issue.select(select_arrays).where(id: issue_id).pluck(select_arrays)
      issue_info = issue_info[0]

      issue_comment_users_array = join_users(issue)
      #总耗时
      # cost_time(issue)
      # cost_time_array = @cost_time_array
      # all_cost_time = @all_cost_time

      #被依赖
      # be_depended_issues_array = be_depended_issues(issue)

      #依赖于
      # depended_issues(issue)
      # depended_issues_array = @depended_issues_array
      # depended_issues_id = @depended_issues_id

    end
    project_members = project.members_user_infos
    project_members_info = []  #指派给
    project_members.includes(user: :user_extension).each do |member|
      user = member&.user
      if user
        real_name = user.try(:show_real_name)
        user_id = user.id
        is_chosen = ((user.id.to_s == issue_info[0].to_s) ? "1" : "0")
        member_info = {id: user_id, name: real_name,avatar_url: url_to_avatar(user),is_chosen: is_chosen}
        project_members_info.push(member_info)
      end
    end

    tracker_info = Tracker&.pluck(:id, :name, :position)
    new_tracker_info = []  #类型
    if tracker_info.size > 0
      tracker_info.each do |t|
        is_chosen = (t[0] == issue_info[1]) ? "1" : "0"
        new_tracker = {id: t[0], name: t[1], position: t[2], is_chosen: is_chosen}
        new_tracker_info.push(new_tracker)
      end
    end

    issue_status = IssueStatus&.pluck(:id,:name,:position)
    new_status_info = []  #缺陷类型
    if issue_status.size > 0
      issue_status.each do |t|
        is_chosen = (t[0] == issue_info[2]) ? "1" : "0"
        new_issue = {id: t[0], name: t[1], position: t[2], is_chosen: is_chosen}
        new_status_info.push(new_issue)
      end
    end

    issue_priority = IssuePriority&.pluck(:id,:name, :position)
    new_priority_info = []  #优先度
    if issue_priority.size > 0
      issue_priority.each do |t|
        is_chosen = (t[0] == issue_info[3]) ? "1" : "0"
        new_issue = {id: t[0], name: t[1], position: t[2], is_chosen: is_chosen}
        new_priority_info.push(new_issue)
      end
    end

    issue_versions = project.versions&.pluck(:id,:name, :status)
    new_version_info = []  #issue里程碑
    if issue_versions.size > 0
      issue_versions.each do |t|
        is_chosen = (t[0] == issue_info[4]) ? "1" : "0"
        new_issue = {id: t[0], name: t[1], status: t[2], is_chosen: is_chosen}
        new_version_info.push(new_issue)
      end
    end

    issue_done_ratio = %w(0 10 20 30 40 50 60 70 80 90 100)
    new_done_info = []  #完成度
    if issue_done_ratio.size > 0
      issue_done_ratio.each do |t|
        is_chosen = (t == issue_info[8].to_s) ? "1" : "0"
        new_issue = {id:t.to_i, name: (t.to_s + "%"), is_chosen: is_chosen}
        new_done_info.push(new_issue)
      end
    end

    issue_tags = project.issue_tags&.pluck(:id,:name, :color)
    new_tags_info = []  #issue标签
    if issue_tags.size > 0
      issue_tags.each do |t|
        is_chosen = (use_tags.size > 0 && use_tags.include?(t[0])) ? "1" : "0"
        new_issue = {id: t[0], name: t[1], color: t[2], is_chosen: is_chosen}
        new_tags_info.push(new_issue)
      end
    end

    issue_types = %w(普通 悬赏)
    new_types_info = []  #issue标签
    issue_types.each_with_index do |i, index|
      is_chosen = (issue_info[9] == "#{index+1}") ? "1" : "0"
      is_token = (index.to_s == "1") ? issue_info[10] : nil
      new_type_info = {id: index+1, name: i, token: is_token, is_chosen: is_chosen}
      new_types_info.push(new_type_info)
    end

    #依赖issue暂时取消
    # depend_other_issues = project.issues.issue_issue.where.not(id: issue_id)&.pluck(:id, :subject)
    # if depend_other_issues.size > 0
    #   depend_other_issues.each do |t|
    #     is_chosen = depended_issues_id.include?(t[0]) ? "1" : "0"
    #     new_issue = {id: t[0], subject: t[1], is_chosen: is_chosen}
    #     all_issues.push(new_issue)
    #   end
    # end


    {
      "assign_user": project_members_info,
      "tracker": new_tracker_info,
      "issue_status": new_status_info,
      "priority": new_priority_info,
      "issue_version": new_version_info,
      "start_date": issue_info[5],
      "due_date": issue_info[6],
      "joins_users": issue_comment_users_array,
      "cost_time_users": cost_time_array,
      # "total_cost_time": Time.at(all_cost_time).utc.strftime('%H h %M min %S s'),
      # "be_depended_issues": be_depended_issues_array,
      # "depended_issues":depended_issues_array,
      # "estimated_hours": issue_info[7],
      "done_ratio": new_done_info,
      "issue_tag": new_tags_info,
      "issue_type": new_types_info,
      "all_issues": all_issues
    }

  end

  def join_users(issue)
    #协作者
    issue_comment_users_array = []
    issue_comment_users = issue.journals.select(:user_id).distinct
    if issue.present? && issue_comment_users.size > 0
      issue_comment_users.each do |j|
        user_avatar = url_to_avatar(j.user)
        issue_comment_users_array.push({login: j.user.try(:login), avatar_url: user_avatar})
      end
    end
    issue_comment_users_array
  end

  # def cost_time(issue)
  #   #总耗时
  #   @cost_time_array = []
  #   @all_cost_time = 0
  #   all_issue_times = issue.issue_times.includes(:user).where.not(end_time: nil)
  #   if issue.present? && all_issue_times.size > 0
  #     all_issue_times.each do |time|
  #       cost_time = time.end_time.to_i - time.start_time.to_i
  #       cost_time = cost_time > 0 ? cost_time : 0
  #       @all_cost_time = @all_cost_time + cost_time
  #       set_cost_time = Time.at(cost_time).utc.strftime('%H h %M min %S s')
  #       @cost_time_array.push({login: time.user.try(:login), avatar_url: url_to_avatar(time.user), cost_time: set_cost_time})
  #     end
  #   end
  # end

  # def depended_issues(issue)
  #   #依赖于
  #   @depended_issues_id = []
  #   @depended_issues_array = []
  #   depended_issues = issue.issue_depends.pluck(:id,:depend_issue_id).uniq
  #   if issue.present? && depended_issues.size > 0
  #     depended_issues.each do |de|
  #       @depended_issues_id.push(de[1])
  #       issues = Issue.select(:id, :subject).where(id: de[1]).as_json
  #       issues = issues.first.merge(depend_id: de[0])
  #       @depended_issues_array.push(issues)
  #     end
  #     @depended_issues_id.delete(issue.id)
  #   end
  # end

  # def be_depended_issues(issue)
  #   be_depended_issues_array = []
  #   be_depended_issues = IssueDepend.where(depend_issue_id: issue.id).pluck(:id,:issue_id).uniq
  #   if issue.present? && be_depended_issues.size > 0
  #     be_depended_issues.each do |de|
  #       d_issues =  Issue.select(:id, :subject).where(id: de[1]).as_json
  #       d_issues = d_issues.first.merge(depend_id: de[0])
  #       be_depended_issues_array.push(d_issues)
  #     end
  #   end
  #   be_depended_issues_array
  # end

end
