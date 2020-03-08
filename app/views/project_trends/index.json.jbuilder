json.partial! "commons/success"
json.issues_count @project_issues_count
json.open_issues_count @project_open_issues_count
json.close_issues_count @project_close_issues_count
json.pr_all_count @project_pr_all_count
json.pr_count @project_pr_count
json.new_pr_count @project_new_pr_count
json.limit @limit
json.project_trends_size @project_trends_size
json.project_trends do
  json.array! @project_trends.to_a.each do |trend|
    json.id trend.id
    json.trend_type trend.trend_type
    json.action_type l("trend.#{trend.action_type}") + l("trend.#{trend.trend_type}")
    json.trend_id trend.trend_id
    json.user_name trend.user.try(:show_real_name)
    json.user_login trend.user.login
    json.user_avatar url_to_avatar(trend.user)

    if trend.trend_type == "Issue"
      json.partial! "issues/simple_issue_item", locals: {issue: trend.trend}
    elsif trend.trend_type == "VersionRelease"
      json.partial! "version_releases/simple_version_release", locals: {version: trend.trend}
    else
      json.name trend.trend.title
      json.created_at format_time(trend.trend.created_at)
    end

    #后续需要天际pullrequest 和 版本的内容

  end
end

