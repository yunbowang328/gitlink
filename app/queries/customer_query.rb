class CustomerQuery < ApplicationQuery
  attr_reader :partner, :user, :params

  def initialize(partner, user, params)
    @partner = partner
    @user    = user
    @params  = params
  end

  def call
    customers = manager_group_scope

    keyword = params[:keyword].to_s.strip.presence
    customers = customers.joins(:school).where('schools.name LIKE ?', "%#{keyword}%") if keyword

    customers
  end

  private

  def manager_group_scope
    # 超级管理员 或者 管理员
    if user.admin_or_business? || partner.admin_partner_manager_group.partner_managers.exists?(user: user)
      partner.customers
    else
      manager_group_ids = user.partner_managers.where(partner: partner).joins(:partner_manager_group).pluck('partner_manager_groups.id')
      partner.customers.where(partner_manager_group_id: manager_group_ids)
    end
  end
end