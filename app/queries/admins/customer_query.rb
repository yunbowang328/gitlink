class Admins::CustomerQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc, default_table: 'customers'

  def initialize(params)
    @params = params
  end

  def call
    customers = Customer.all

    if params[:partner_id].present?
      customers = customers.joins(:partner_customers).where(partner_customers: { partner_id: params[:partner_id] })
    end

    keyword = params[:keyword].to_s.strip
    customers = customers.joins(:school).where('schools.name LIKE ?', "%#{keyword}%") if keyword.present?

    custom_sort(customers, params[:sort_by], params[:sort_direction])
  end
end