class Admins::IdentityAuths::RevokeApplyService < ApplicationService
  attr_reader :apply, :user

  def initialize(apply)
    @apply = apply
    @user  = apply.user
  end

  def call
    ActiveRecord::Base.transaction do
      apply.revoke!
      user.update!(authentication: false)

      deal_tiding!
    end
  end

  private

  def deal_tiding!
    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'CancelUserAuthentication',
                   belong_container_id: apply.user_id, belong_container_type: 'User',
                   status: 1, tiding_type: 'System')
  end
end