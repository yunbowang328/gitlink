class Users::ProjectPackageService < ApplicationService
  include CustomSortable

  sort_columns :published_at, default_by: :published_at, default_direction: :desc

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    packages = category_scope_filter

    packages = user_policy_filter(packages)

    custom_sort(packages, :published_at, params[:sort_direction])
  end

  private

  def category_scope_filter
    case params[:category]
    when 'bidden' then
      user.bidden_project_packages
    when 'manage' then
      user.project_packages
    else
      ids = user.bidding_users.pluck(:project_package_id) + user.project_packages.pluck(:id)
      ProjectPackage.where(id: ids)
    end
  end

  def user_policy_filter(relations)
    if self_or_admin?
      status_filter(relations)
    else
      relations.visible
    end
  end

  def status_filter(relations)
    return relations unless self_or_admin?

    case params[:category]
    when 'bidden' then bidding_status_filter(relations)
    when 'manage' then package_status_filter(relations)
    else relations
    end
  end

  def bidding_status_filter(relations)
    case params[:status]
    when 'bidding_lost' then
      relations.where(bidding_users: { status: :bidding_lost })
    when 'bidding_won' then
      relations.where(bidding_users: { status: :bidding_won })
    else
      relations
    end
  end

  def package_status_filter(relations)
    case params[:status]
    when 'unpublished' then relations.invisible
    when 'bidding'     then relations.where(status: :published)
    when 'finished'    then relations.where(status: %w[bidding_ended bidding_finished])
    else relations
    end
  end

  def self_or_admin?
    User.current&.id == user.id || User.current&.admin_or_business?
  end
end