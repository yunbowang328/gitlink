class Admins::ProjectPackageAppliesController < Admins::BaseController
  before_action :current_apply,only: [:agree,:refuse]

  def index
    params[:status] ||= 'pending'
    status = params[:status]
    if status == 'all'
      status = %w(agreed refused)
    end
    package_applies = ProjectPackageApply.where(status: status)
    keyword = params[:keyword].to_s.strip || ""
    if keyword.present?
      package_applies = package_applies.joins(:project_package).where("project_packages.title like ?","%#{keyword}%")
    end
    @package_applies = paginate package_applies.includes(project_package: { creator: :user_extension })
  end

  def agree
    ProjectPackages::AgreeApplyService.new(current_apply).call
    render_success_js
  rescue ProjectPackages::AgreeApplyService::Error => e
    render json: { status: -1, message: e.message }
  end

  def refuse
    ProjectPackages::RefuseApplyService.new(current_apply, reason: params[:reason]).call
    render_success_js
  rescue ProjectPackages::RefuseApplyService::Error => e
    render json: { status: -1, message: e.message }
  end

  private

  def current_apply
    @_current_apply ||= ProjectPackageApply.find(params[:id])
  end
end