class ProjectPackages::RefuseApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :apply, :package, :params

  def initialize(apply, params)
    @apply   = apply
    @package = apply.project_package
    @params  = params
  end

  def call
    raise Error, '该状态下不能进行此操作' unless apply.may_refuse? && package.may_refuse?

    ActiveRecord::Base.transaction do
      apply.refuse
      apply.reason = params[:reason].to_s.strip
      apply.save!

      # 发布
      package.refuse!

      # 消息
      send_refuse_notify!
    end
  end

  private

  def send_refuse_notify!
    Tiding.where(container_id: package.id, container_type: 'ProjectPackage',
                 tiding_type: 'Apply', status: 0).update_all(status: 1)

    Tiding.create!(user_id: package.creator_id, trigger_user_id: 0,
                   container_id: package.id, container_type: 'ProjectPackage',
                   tiding_type: 'System', status: 2, extra: apply.reason)
  end
end
