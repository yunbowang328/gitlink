class Users::UnreadMessageInfosController < Users::BaseController
  before_action :private_user_resources!

  def show
    click_time = observed_user.click_time

    unread_tiding_count  = observed_user.tidings.where('created_at > ?', click_time).count
    unread_message_count = observed_user.private_messages.only_unread.group(:target_id).count.count

    render_ok(unread_tiding_count: unread_tiding_count, unread_message_count: unread_message_count)
  end
end