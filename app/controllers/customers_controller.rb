class CustomersController < ApplicationController
  def show 
    targets = UsersService.new.user_info params, current_user
    render json: targets
  end
end
