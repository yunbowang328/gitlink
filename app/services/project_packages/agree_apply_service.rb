class ProjectPackages::AgreeApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :apply, :package

  def initialize(apply)
    @apply   = apply
    @package = apply.project_package
  end

  def call
    raise Error, '该状态下不能进行此操作' unless apply.may_agree? && package.may_publish?

    ActiveRecord::Base.transaction do
      apply.agree!

      # 发布
      package.publish
      package.published_at = Time.now
      package.save!

      # 消息
      send_agree_notify!
    end
  end

  private
  def send_agree_notify!
    Tiding.where(container_id: package.id, container_type: 'ProjectPackage',
                 tiding_type: 'Apply', status: 0).update_all(status: 1)

    Tiding.create!(user_id: package.creator_id, trigger_user_id: 0,
                   container_id: package.id, container_type: 'ProjectPackage',
                   tiding_type: 'System', status: 1)
  end
end