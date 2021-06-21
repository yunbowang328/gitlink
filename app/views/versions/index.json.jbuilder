json.partial! "commons/success"
json.open_count @open_versions_size
json.closed_count @closed_versions_size
json.versions_count @versions_size
json.user_admin_or_member @user_admin_or_member
json.versions do

  json.array! @versions.each.to_a do |version|
    json.extract! version, :id, :name, :description, :effective_date,:status,:percent
    json.open_issues_count (version.issues_count - version.issues.closed.size)
    json.close_issues_count version.issues.closed.size
    json.created_at format_time(version.created_on)
    json.updated_at format_time(version.updated_on)
    json.user_name version.version_user.try(:show_real_name)
    json.user_login version.version_user.try(:login)
  end
end