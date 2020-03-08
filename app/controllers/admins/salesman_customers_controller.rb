class Admins::SalesmanCustomersController < Admins::BaseController
  before_action :set_salesman

  def index
    @customers = @salesman.salesman_customers.includes(:user, :school)
  end

  def batch_add
    customer_ids = @salesman.salesman_customers.pluck(:user_id)
    user_ids = params[:user_ids] - customer_ids
    user_ids.each do |user_id|
      user = UserExtension.find_by(user_id: user_id)
      next if user.blank? || @salesman.salesman_customers.where(user_id: user.user_id).exists?
      @salesman.salesman_customers.create!(user_id: user.user_id, school_id: user.school_id)
    end
    render_ok
  end

  def destroy
    @salesman.salesman_customers.find_by!(id: params[:id]).destroy
  end

  private
  def set_salesman
    @salesman = Salesman.find params[:salesman_id]
  end

end