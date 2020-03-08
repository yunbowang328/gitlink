desc 'transfer user profile completed data'
task transfer_user_profile_completed: :environment do
  buffer_size = 1000

  ids = []
  User.includes(:user_extension).find_each do |user|
    extension = user.user_extension
    next if extension.blank? || user.lastname.blank? || user.mail.blank? || extension.school_id.blank? || extension.identity.blank?

    ids << user.id
    if ids.size == buffer_size
      batch_update_user_profile_completed(ids)
      ids.clear
    end
  end

  batch_update_user_profile_completed(ids) if ids.present?
end

def batch_update_user_profile_completed(ids)
  User.connection.execute("UPDATE users SET profile_completed = true WHERE id IN (#{ids.join(',')})")
end