class SettingsController < ApplicationController
  def show
    @old_projects_url = nil 
    @old_projects_url = "https://www.trustie.net/users/#{current_user.try(:login)}/projects"  if current_user.present?
  end
end
