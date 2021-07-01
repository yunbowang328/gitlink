json.partial! "commons/success"
json.user_permission @user_permission
# json.releases @version_releases
json.releases do
  json.array! @version_releases.to_a.each do |re|
    if re.present? 
      user = User.select(:id, :gitea_uid, :login, :lastname,:firstname, :nickname).find_by_gitea_uid(re["author"]["id"])
      version = @forge_releases.find_by(version_gid: re["id"])
      if @user_permission && re["draft"]
        json.version_id version.try(:id)
        json.id re["id"]
        json.tag_name re["tag_name"]
        json.target_commitish re["target_commitish"]
        json.name re["name"]
        json.body re["body"]
        json.url re["url"]
        json.tarball_url render_tar_url(@owner, @repository, re["tag_name"])
        json.zipball_url render_zip_url(@owner, @repository, re["tag_name"])
        json.draft re["draft"] ? "草稿" : (re["prerelease"] ? "预发行" : "稳定")
        json.created_at format_time(version.created_at.to_s.to_time)
        json.published_at format_time(version.created_at.to_s.to_time)
        json.user_name user.present? ? user.try(:show_real_name) : ""
        json.image_url user.present? ? url_to_avatar(user) : ""
      else
        unless re["draft"]
          json.version_id version.try(:id)
          json.id re["id"]
          json.tag_name re["tag_name"]
          json.target_commitish re["target_commitish"]
          json.name re["name"]
          json.body re["body"]
          json.url re["url"]
          json.tarball_url render_tar_url(@owner, @repository, re["tag_name"])
          json.zipball_url render_zip_url(@owner, @repository, re["tag_name"])
          json.draft re["draft"] ? "草稿" : (re["prerelease"] ? "预发行" : "稳定")
          json.created_at format_time(version.created_at.to_s.to_time)
          json.published_at format_time(version.created_at.to_s.to_time)
          json.user_name user.present? ? user.try(:show_real_name) : ""
          json.image_url user.present? ? url_to_avatar(user) : ""
        end
      end
      
      json.attachments do
        json.array! version.try(:attachments) do |attachment|
          json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
        end
      end
    end
    
  end
end
