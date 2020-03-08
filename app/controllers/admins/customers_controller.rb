class Admins::CustomersController < Admins::BaseController
  # skip_before_action :check_sign
  helper_method :current_partner

  def index
    default_sort('created_at', 'desc')

    customers = Admins::CustomerQuery.call(params.merge(partner_id: current_partner.id))
    @customers = paginate(customers.preload(:school))
  end

  def create
    params[:school_ids] = Array.wrap(params[:school_ids])
    school_ids = School.where(id: params[:school_ids]).pluck(:id)

    ActiveRecord::Base.transaction do
      school_ids.each do |school_id|
        next if current_partner.customers.exists?(school_id)

        customer = Customer.create!(school_id: school_id)
        current_partner.partner_customers.create!(customer: customer)
      end
    end

    render_ok
  end

  def destroy
    current_partner.customers.find(params[:id]).destroy!

    render_delete_success
  end

  private

  def current_partner
    @_current_partner ||= Partner.find(params[:partner_id])
  end
end