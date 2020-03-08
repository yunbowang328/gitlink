class Users::PrivateMessagesController < Users::BaseController
  before_action :require_login
  before_action :private_user_resources!
  after_action :update_onclick_time!, only: [:index]

  def index
    @count = observed_user.private_messages.without_deleted.group(:target_id).count.count

    subquery = observed_user.private_messages.without_deleted.order(send_time: :desc).to_sql
    query = "SELECT subquery.*, COUNT(*) message_count FROM (#{subquery}) subquery "\
            "GROUP BY subquery.target_id ORDER BY subquery.send_time desc LIMIT #{limit_value} OFFSET #{offset_value}"
    @messages = PrivateMessage.select('*').from("(#{query}) AS query").includes(target: :user_extension)

    observed_user.private_messages.only_unread.update_all(status: 1)
  end

  def create
    receiver = User.find_by(id: params[:target_id])
    return render_error('用户未找到') if receiver.blank?

    @message = PrivateMessages::CreateService.call(observed_user, receiver, create_params)
  rescue PrivateMessages::CreateService::Error => ex
    render_error(ex.message)
  end

  def destroy
    message = observed_user.private_messages.without_deleted.find(params[:id])
    message.destroy!

    render_ok
  end

  private

  def update_onclick_time!
    current_user.onclick_time.touch(:onclick_time)
  end

  def create_params
    params.permit(:content)
  end
end