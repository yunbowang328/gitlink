class ProjectPackagesController < ApplicationController
  include PaginateHelper

  before_action :require_login, :check_auth, only: %i[show create update destroy]

  helper_method :current_package, :package_manageable?

  def index
    packages = ProjectPackage.where(status: %w(published bidding_ended bidding_finished))

    packages = packages.where(project_package_category_id: params[:category_id]) if params[:category_id].present?

    keyword = params[:keyword].to_s.strip
    packages = packages.where('title LIKE ?', "%#{keyword}%") if keyword.present?

    @count = packages.count

    direction = params[:sort_direction] == 'asc' ? 'asc' : 'desc'
    sort      = params[:sort_by] == 'price' ? 'min_price' : 'published_at'
    packages  = packages.order("#{sort} #{direction}")

    @packages = paginate packages.includes(:creator, :attachments, :project_package_category, bidding_users: :user)
  end

  def show
    return render_forbidden unless current_package.visitable? || package_manageable?

    current_package.increment!(:visit_count)
  end

  def create
    package = current_user.project_packages.new
    ProjectPackages::SaveService.call(package, save_params)

    package.increment!(:visit_count)
    render_ok(id: package.id)
  rescue ProjectPackages::SaveService::Error => ex
    render_error(ex.message)
  end

  def update
    package = current_user.project_packages.find(params[:id])
    return render_error('该状态下不能编辑') unless package.editable?

    ProjectPackages::SaveService.call(package, save_params)
    package.increment!(:visit_count)
    render_ok(id: package.id)
  rescue ProjectPackages::SaveService::Error => ex
    render_error(ex.message)
  end

  def destroy
    package = ProjectPackage.find(params[:id])
    return render_forbidden unless package.deletable? && package_manageable?

    package.destroy!

    Tiding.create!(user_id: package.creator_id, trigger_user_id: 0, container_id: package.id,
                   container_type: 'ProjectPackage', tiding_type: 'Destroyed', extra: package.title)

    render_ok
  end

  private

  def current_package
    @_current_package ||= ProjectPackage.find(params[:id])
  end

  def package_manageable?
    current_user&.id == current_package.creator_id || admin_or_business?
  end

  def save_params
    params.permit(*%i[category_id title content attachment_ids deadline_at min_price max_price
                      contact_name contact_phone code publish])
  end
end