class Users::PrivateMessageDetailsController < Users::BaseController
  before_action :require_login
  before_action :private_user_resources!

  after_action :update_message_status, only: [:show]

  helper_method :target_user

  def show
    messages = observed_user.private_messages.without_deleted.where(target: target_user)

    @count    = messages.count
    @messages = paginate messages.order(send_time: :desc).includes(sender: :user_extension)
  end

  private

  def target_user
    @_target_user ||= User.find(params[:target_id])
  end

  # 置为已读
  def update_message_status
    observed_user.private_messages.only_unread.where(target: target_user).update_all(status: 1)
  end
end