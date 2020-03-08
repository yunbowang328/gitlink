class PartnersController < ApplicationController
  skip_before_action :check_sign
  include Base::PaginateHelper
  include Admins::RenderHelper

  layout 'college'

  before_action :require_login, :check_partner_present!, :check_permission!
  before_action :check_admin_manager_group_permission!, except: [:customers]

  helper_method :current_partner, :manager_permission?

  def customers
    customers = CustomerQuery.call(current_partner, current_user, params)
    @customers = paginate(customers.includes(:school))

    load_customer_extra_statistic_data
  end

  def partner_manager_groups
    @manager_groups = current_partner.partner_manager_groups.includes(users: :user_extension).to_a
  end

  def manager_group
    name = params[:manager_group_name].to_s.strip

    if params[:manager_group_id].present?
      # 重命名
      @manager_group = current_partner.partner_manager_groups.find(params[:manager_group_id])
      return render_error('不能修改管理者权限组名称') if @manager_group.admin?
      @manager_group.update!(name: name)
    else
      # 新建
      @manager_group = current_partner.partner_manager_groups.create!(name: name)
    end
  end

  def remove_manager_group
    manager_group = current_partner.partner_manager_groups.find(params[:manager_group_id])
    return render_error('不能删除管理者权限组') if manager_group.admin?
    manager_group.destroy!

    render_delete_success
  end

  def partner_managers
    user_ids = Array.wrap(params[:user_ids])
    @manager_group = current_partner.partner_manager_groups.find(params[:manager_group_id])

    ActiveRecord::Base.transaction do
      User.where(id: user_ids).pluck(:id).each do |user_id|
        next if current_partner.partner_managers.exists?(partner_manager_group: @manager_group, user_id: user_id)

        current_partner.partner_managers.create!(partner_manager_group: @manager_group, user_id: user_id)
      end
    end

    @manager_group.reload
  end

  def remove_partner_manager
    partner_manager = current_partner.partner_managers.find(params[:manager_id])
    return render_error('不能删除自己') if partner_manager.user_id == current_user.id && partner_manager.partner_manager_group.admin?

    partner_manager.destroy!

    render_delete_success
  end

  def customer_manager_group
    customer = current_partner.customers.find(params[:customer_id])

    if params[:manager_group_id].present?
      manager_group = current_partner.partner_manager_groups.find(params[:manager_group_id])
      customer.update!(partner_manager_group: manager_group)
    else
      customer.update!(partner_manager_group_id: nil)
    end

    render_ok
  end

  private

  def current_partner
    @_current_partner ||= Partner.find(params[:id].presence || params[:partner_id])
  end

  def check_partner_present!
    return if current_partner.present?

    redirect_to '/404'
  end

  def manager_permission?
    admin_or_business? || current_user.partner_managers.exists?(partner_id: current_partner.id)
  end

  def check_permission!
    return if manager_permission?

    redirect_to '/403'
  end

  def check_admin_manager_group_permission!
    return if admin_or_business?
    return if current_partner.admin_partner_manager_group.partner_managers.exists?(user: current_user)

    render_forbidden
  end

  def load_customer_extra_statistic_data
    school_ids = @customers.map(&:school_id)

    teacher_map = UserExtension.where(school_id: school_ids, identity: 0).group(:school_id).count
    student_map = UserExtension.where(school_id: school_ids, identity: 1).group(:school_id).count
    course_map = Course.where(school_id: school_ids, is_delete: 0).where.not(id: 1309).group(:school_id).count
    shixun_map = Shixun.visible.joins('left join user_extensions on user_extensions.user_id = shixuns.user_id')
                   .where(user_extensions: { school_id: school_ids }).group('user_extensions.school_id').count
    shixun_report_map = StudentWork.where(work_status: [1, 2]).where('myshixun_id != 0')
                          .joins('left join user_extensions on user_extensions.user_id = student_works.user_id')
                          .where(user_extensions: { school_id: school_ids })
                          .group('user_extensions.school_id').count
    course_time_map = Course.where(school_id: school_ids, is_delete: 0)
                        .where.not(id: 1309).group(:school_id).maximum(:updated_at)

    @customers.each do |customer|
      customer._extra_data = {
        teacher_count: teacher_map[customer.school_id],
        student_count: student_map[customer.school_id],
        course_count: course_map[customer.school_id],
        shixun_count: shixun_map[customer.school_id],
        shixun_report_count: shixun_report_map[customer.school_id],
        course_time: course_time_map[customer.school_id]
      }
    end
  end
end