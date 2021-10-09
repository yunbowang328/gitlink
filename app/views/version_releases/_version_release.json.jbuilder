json.version_id version.try(:id)
json.id version&.version_gid
json.tag_name version&.tag_name
json.target_commitish version&.target_commitish
json.name version&.name
json.sha version&.sha
json.body version&.body
json.url version&.url
json.tarball_url render_tar_url(@owner, @repository, version&.tag_name)
json.zipball_url render_zip_url(@owner, @repository, version&.tag_name)
json.draft version&.draft ? "草稿" : (version&.prerelease ? "预发行" : "稳定")
json.created_at format_time(version.created_at.to_s.to_time)
json.published_at format_time(version.created_at.to_s.to_time)
json.user_name user.present? ? user.try(:show_real_name) : ""
json.user_login user&.login
json.image_url user.present? ? url_to_avatar(user) : ""
json.attachments do
  json.array! version.try(:attachments) do |attachment|
    json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
  end
end