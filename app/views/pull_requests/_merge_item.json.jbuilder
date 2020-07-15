
json.issue_tags @project_tags
json.issue_versions @project_versions
json.issue_priories @project_priories
json.project_author @project.owner.try(:show_real_name)
json.project_name @project.try(:name)
json.members do
  json.array! @project_members.to_a.each do |member|
    json.id member.user_id
    json.login member.user.try(:login)
    json.name member.user.try(:show_real_name)
    json.avatar_url url_to_avatar(member.user)
  end
end