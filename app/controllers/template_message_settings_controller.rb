class TemplateMessageSettingsController < ApplicationController
  before_action :require_login

  def index 
    @group_settings = TemplateMessageSetting.group(:type).count
  end

end