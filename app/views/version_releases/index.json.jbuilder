json.partial! "commons/success"
json.user_permission @user_permission
# json.releases @version_releases
json.releases do
  json.array! @version_releases.to_a.each do |re|
    if re.present? 
      user = User.select(:id, :gitea_uid, :login, :lastname,:firstname, :nickname).find_by_gitea_uid(re["author"]["id"])
      version = @forge_releases.find_by(version_gid: re["id"])
      if @user_permission && re["draft"]
        json.partial! "version_release", locals: {version: version, user: user, re: re}
      else
        unless re["draft"]
          json.partial! "version_release", locals: {version: version, user: user, re: re}
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
