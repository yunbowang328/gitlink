json.id trend.id
json.trend_type trend.trend_type
json.action_type l("trend.#{trend.action_type}") + l("trend.#{trend.trend_type}")
json.trend_id trend.trend_id
json.user_name trend.user.try(:show_real_name)
json.user_login trend.user.login
json.user_avatar url_to_avatar(trend.user)
json.action_time time_from_now(trend.created_at)

if trend.trend_type == "Issue"
  json.partial! "issues/simple_issue_item", locals: {issue: trend.trend}
elsif trend.trend_type == "VersionRelease"
  json.partial! "version_releases/simple_version_release", locals: {version: trend.trend}
else
  json.name trend.trend.title
  json.created_at format_time(trend.trend.created_at)
end
