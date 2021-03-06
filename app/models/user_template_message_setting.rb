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
  serialize :notification_body, Hash 
  serialize :email_body, Hash

  belongs_to :user

  before_update :set_body_value

  def self.build(user_id)
    self.create!(user_id: user_id, notification_body: init_notification_body, email_body: init_email_body)
  end

  def self.init_notification_body 
    {
      "Normal::Permission": true,
      "Normal::Project": true,
      "Normal::Organization": true,
      "Normal::IssueAssigned": true,
      "Normal::PullRequestAssigned": true,
      "CreateOrAssign::IssueChanged": true,
      "CreateOrAssign::PullRequestChanged": true,
      "ManageProject::Issue": true,
      "ManageProject::PullRequest": true,
      "ManageProject::Member": true,
      "ManageProject::SettingChanged": true,
    }.stringify_keys!
  end

  def self.init_email_body 
    {
      "Normal::Permission": true,
      "Normal::Project": true,
      "Normal::Organization": true,
      "Normal::IssueAssigned": true,
      "Normal::PullRequestAssigned": true,
      "CreateOrAssign::IssueChanged": true,
      "CreateOrAssign::PullRequestChanged": true,
      "ManageProject::Issue": true,
      "ManageProject::PullRequest": true,
      "ManageProject::Member": true,
      "ManageProject::SettingChanged": true,
    }.stringify_keys!
  end

  private 

  def set_body_value
    self.notification_body.each do |k, v|
      self.notification_body[k] = ActiveModel::Type::Boolean.new.cast(v).nil? ? false : ActiveModel::Type::Boolean.new.cast(v)
    end

    self.email_body.each do |k, v|
      self.email_body[k] = ActiveModel::Type::Boolean.new.cast(v).nil? ? false : ActiveModel::Type::Boolean.new.cast(v)
    end
  end
end
