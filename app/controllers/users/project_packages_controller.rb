class Users::ProjectPackagesController < Users::BaseController

  def index
    packages = Users::ProjectPackageService.call(observed_user, query_params)

    @count = packages.count
    @packages = paginate(packages.includes(:project_package_category))

    bidding_users = BiddingUser.where(project_package_id: @packages.map(&:id), user_id: observed_user.id)
    bidding_users = bidding_users.group(:project_package_id).select(:project_package_id, :status)
    @bidding_status_map = bidding_users.each_with_object({}) { |u, h| h[u.project_package_id] = u.status }
  end

  def query_params
    params.permit(:category, :status, :sort_by, :sort_direction)
  end
end