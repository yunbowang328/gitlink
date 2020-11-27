# == Schema Information
#
# Table name: attachment_group_settings
#
#  id              :integer          not null, primary key
#  attachment_id   :integer
#  course_group_id :integer
#  course_id       :integer
#  publish_time    :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_attachment_group_settings_on_attachment_id    (attachment_id)
#  index_attachment_group_settings_on_course_group_id  (course_group_id)
#  index_attachment_group_settings_on_course_id        (course_id)
#

class AttachmentGroupSetting < ActiveRecord::Base
  belongs_to :attachment
  # belongs_to :course_group
  # belongs_to :course

  scope :none_published, -> {where("attachment_group_settings.publish_time IS NULL OR attachment_group_settings.publish_time > ?", Time.now)}

end
