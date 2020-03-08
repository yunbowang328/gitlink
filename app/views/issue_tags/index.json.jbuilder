json.partial! "commons/success"
json.issue_tags_count @issue_tags_size
json.user_admin_or_member @user_admin_or_member
json.issue_tags do

  json.array! @issue_tags.each.to_a do |tag|
    json.extract! tag, :id, :name, :description, :color, :issues_count, :project_id, :gid, :gitea_url
  end
end