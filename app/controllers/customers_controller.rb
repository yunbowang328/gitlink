class CustomersController < ApplicationController
  def show 
    targets = UsersService.new.user_info params, current_user
    render json: targets
  end

  def edit_brief 
    targets = UsersService.new.edit_brief params, current_user
    render json: targets
  end
end
