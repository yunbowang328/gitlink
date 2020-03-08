class ProjectPackages::ApplyPublishService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :package

  def initialize(package)
    @package = package
  end

  def call
    return if package.applying?

    raise Error, '该状态下不能申请发布' unless package.may_apply?

    ActiveRecord::Base.transaction do
      package.apply!

      package.project_package_applies.create!

      send_project_package_apply_notify!
    end
  end

  private

  def send_project_package_apply_notify!
    Tiding.create!(user_id: 1, trigger_user_id: package.creator_id,
                   container_id: package.id, container_type: 'ProjectPackage',
                   tiding_type: 'Apply', status: 0)
  end
end
