class Admins::IdentityAuths::RefuseApplyService < ApplicationService
  attr_reader :apply, :user, :params

  def initialize(apply, params)
    @apply  = apply
    @user   = apply.user
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      apply.update!(status: 2, remarks: reason)
      user.update!(authentication: false)

      deal_tiding!
      apply.attachment&.destroy
      # delete_auth_file!
    end
  end

  private

  def reason
    params[:reason].to_s.strip
  end

  def deal_tiding!
    apply.tidings.where(tiding_type: 'Apply').update_all(status: 1)

    Tiding.create!(user_id: apply.user_id, trigger_user_id: 0,
                   container_id: apply.id, container_type: 'ApplyUserAuthentication',
                   belong_container_id: apply.user_id, belong_container_type: 'User',
                   status: 2, tiding_type: 'System')
  end

  def delete_auth_file!
    path = Util::FileManage.disk_real_name_auth_filename(user.id)
    File.delete(path) if File.exists?(path)

    apply.update!(is_delete: true)
  end
end