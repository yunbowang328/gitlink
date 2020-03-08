class Admins::ShixunAuths::AgreeApplyService < ApplicationService
  attr_reader :apply, :user, :shixun

  def initialize(apply, user)
    @apply  = apply
    @user   = user
    @shixun = Shixun.find(apply.container_id)
  end

  def call
    ActiveRecord::Base.transaction do
      apply.update!(status: 1, dealer_id: user.id)
      shixun.update!(public: 2, publish_time: Time.now)

      # 奖励金币、经验
      reward_grade_and_experience!

      deal_tiding!
    end
  end

  private

  def reward_grade_and_experience!
    score = shixun.all_score
    shixun_creator = shixun.user

    RewardGradeService.call(shixun_creator, container_id: shixun.id, container_type: 'shixunPublish', score: score)

    Experience.create!(user_id: shixun_creator.id, container_id: shixun.id, container_type: 'shixunPublish', score: score)
    shixun_creator.update_column(:experience, shixun_creator.experience.to_i + score)
  end

  def deal_tiding!
    apply.tidings.where(tiding_type: 'Apply', status: 0).update_all(status: 1)

    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'ApplyAction',
                   parent_container_id: apply.container_id, parent_container_type: apply.container_type,
                   belong_container_id: apply.container_id, belong_container_type: 'Shixun',
                   status: 1, tiding_type: 'System')
  end
end