# == Schema Information
#
# Table name: user_template_message_settings
#
#  id                :integer          not null, primary key
#  user_id           :integer
#  notification_body :text(65535)
#  email_body        :text(65535)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_user_template_message_settings_on_user_id  (user_id)
#

class UserTemplateMessageSetting < ApplicationRecord
end
