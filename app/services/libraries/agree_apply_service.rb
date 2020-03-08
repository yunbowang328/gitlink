class Libraries::AgreeApplyService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :library_apply, :library, :user

  def initialize(library_apply, user)
    @library_apply = library_apply
    @library       = library_apply.library
    @user          = user
  end

  def call
    raise Error, '该状态下不能进行此操作' unless library_apply.may_agree?

    ActiveRecord::Base.transaction do
      library_apply.agree!
      library_apply.library.publish!

      # 将消息改为已处理
      Tiding.where(container_id: library.id, container_type: 'Library', tiding_type: 'Apply', status: 0).update_all(status: 1)
      notify_library_author!
    end
  end

  private

  def notify_library_author!
    Tiding.create!(user_id: library.user_id, trigger_user_id: 0,
                   container_id: library.id, container_type: 'Library',
                   tiding_type: 'System', status: 1)
  end
end