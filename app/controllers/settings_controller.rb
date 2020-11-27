class SettingsController < ApplicationController
  def show
    @old_projects_url = nil 
    @old_projects_url = "https://www.trustie.net/users/#{current_user.try(:login)}/projects"  if User.current.logged?
  end
end
