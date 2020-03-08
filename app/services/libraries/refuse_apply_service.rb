class Libraries::RefuseApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :library_apply, :library, :user, :params

  def initialize(library_apply, user, params)
    @library_apply = library_apply
    @library       = library_apply.library
    @user          = user
    @params        = params
  end

  def call
    reason = params[:reason].to_s.strip
    raise Error, '原因不能为空' if reason.blank?
    raise Error, '该状态下不能进行此操作' unless library_apply.may_refuse?

    ActiveRecord::Base.transaction do
      library_apply.reason     = reason
      library_apply.refused_at = Time.current
      library_apply.refuse
      library_apply.save!

      library.refuse!

      # 将消息改为已处理
      Tiding.where(container_id: library.id, container_type: 'Library', tiding_type: 'Apply', status: 0).update_all(status: 1)
      notify_library_author!
    end
  end

  private

  def notify_library_author!
    Tiding.create!(user_id: library.user_id, trigger_user_id: 0,
                   container_id: library.id, container_type: 'Library',
                   tiding_type: 'System', status: 2, extra: library_apply.reason)
  end
end