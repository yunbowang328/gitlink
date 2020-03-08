class Admins::ShixunAuths::RefuseApplyService < ApplicationService
  attr_reader :apply, :user, :shixun, :params

  def initialize(apply, user, params)
    @apply  = apply
    @user   = user
    @shixun = Shixun.find(apply.container_id)
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      shixun.update!(public: 0)
      apply.update!(status: 2, reason: reason, dealer_id: user.id)

      deal_tiding!
    end
  end

  private

  def reason
    params[:reason].to_s.strip
  end

  def deal_tiding!
    apply.tidings.where(tiding_type: 'Apply', status: 0).update_all(status: 1)

    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'ApplyAction',
                   parent_container_id: apply.container_id, parent_container_type: apply.container_type,
                   belong_container_id: apply.container_id, belong_container_type: 'Shixun',
                   status: 2, tiding_type: 'System')
  end
end