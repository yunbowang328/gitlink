json.partial! "commons/success"
json.user_permission @user_permission
json.user_admin_permission @user_admin_permission
# json.releases @version_releases
json.releases do
  json.array! @version_releases.each do |version|
    version.update_sha if version.sha.nil?
    if @user_permission && version&.draft
      json.partial! "version_release", locals: {version: version, user: version&.user}
    else
      unless version&.draft
        json.partial! "version_release", locals: {version: version, user: version&.user}
      end
    end
  end
end
