class Users::AccountsController < Users::BaseAccountController
  before_action :private_user_resources!

  def show
  end

  def update
    Users::UpdateAccountService.call(observed_user, update_params)

    render 'show'
  end

  private

  def observed_user
    @_observed_user ||= (User.find_by_id(params[:id]) || User.find_by_login(params[:id]))
  end

  def update_params
    params.permit(:nickname, :name, :show_realname, :gender, :location, :location_city,
                  :identity, :student_id, :technical_title, :school_id, :department_id)
  end
end
