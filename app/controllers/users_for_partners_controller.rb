class UsersForPartnersController < ApplicationController
  include Base::PaginateHelper

  before_action :check_partner_manager_permission!

  def index
    params[:sort_by] = params[:sort_by].presence || 'created_on'
    params[:sort_direction] = params[:sort_direction].presence || 'desc'

    users = Admins::UserQuery.call(search_params)
    @users = paginate users.includes(user_extension: :school)
  end

  private

  def search_params
    params.permit(:name, :sort_by, :sort_direction)
  end

  def check_partner_manager_permission!
    partner = Partner.find(params[:partner_id])
    return if admin_or_business?
    return if partner.admin_partner_manager_group.partner_managers.exists?(user: current_user)

    render_forbidden
  end
end