class Admins::IdentityAuths::AgreeApplyService < ApplicationService
  attr_reader :apply, :user

  def initialize(apply)
    @apply = apply
    @user  = apply.user
  end

  def call
    ActiveRecord::Base.transaction do
      apply.update!(status: 1)
      user.update!(authentication: true)
      RewardGradeService.call(user, container_id: user.id, container_type: 'Authentication', score: 500)

      deal_tiding!
      apply.attachment&.destroy
      # delete_auth_file!
    end
  end

  private

  def deal_tiding!
    apply.tidings.where(tiding_type: 'Apply').update_all(status: 1)

    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'ApplyUserAuthentication',
                   belong_container_id: apply.user_id, belong_container_type: 'User',
                   status: 1, tiding_type: 'System')
  end

  def delete_auth_file!
    path = Util::FileManage.disk_real_name_auth_filename(user.id)
    File.delete(path) if File.exists?(path)

    apply.update!(is_delete: true)
  end
end