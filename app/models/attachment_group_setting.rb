class AttachmentGroupSetting < ActiveRecord::Base
  belongs_to :attachment
  belongs_to :course_group
  belongs_to :course

  scope :none_published, -> {where("attachment_group_settings.publish_time IS NULL OR attachment_group_settings.publish_time > ?", Time.now)}

end
