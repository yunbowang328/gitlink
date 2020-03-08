class Admins::SubjectAuths::AgreeApplyService < ApplicationService
  attr_reader :apply, :user, :subject

  def initialize(apply, user)
    @apply   = apply
    @user    = user
    @subject = Subject.find(apply.container_id)
  end

  def call
    ActiveRecord::Base.transaction do
      apply.update!(status: 1, dealer_id: user.id)
      subject.update!(public: 2, publish_time: Time.now)

      deal_tiding!
    end
  end

  private

  def deal_tiding!
    apply.tidings.where(tiding_type: 'Apply', status: 0).update_all(status: 1)

    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'ApplyAction',
                   parent_container_id: apply.container_id, parent_container_type: apply.container_type,
                   belong_container_id: apply.container_id, belong_container_type: 'Subject',
                   status: 1, tiding_type: 'System')
  end
end