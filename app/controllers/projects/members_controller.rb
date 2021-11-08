class Projects::MembersController < Projects::BaseController
  def index 
    users = @project.all_collaborators.like(params[:search]).includes(:user_extension)
    @users = kaminari_paginate(users)
  end
end