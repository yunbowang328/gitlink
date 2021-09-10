class Users::MessagesController < Users::BaseController 
  before_action :private_user_resources!

  def index 
    data = {
      "receiver": 2,
      "type": @message_type,
      "unread_total": 5,
      "unread_notification": 3,
      "unread_atme": 2,
      "records": [
        {
          "id": 1,
          "sender": 5,
          "receiver": 2,
          "content": "Atme Message Content 1",
          "status": 1,
          "type": 2,
          "source": "PullRequestAtme",
          "notification_url": "http://www.baidu.com",
          "created_at": "2021-09-09 14:34:40"
        },
        {
          "id": 2,
          "sender": 4,
          "receiver": 2,
          "content": "Atme Message Content 2",
          "status": 2,
          "type": 2,
          "source": "IssueAtme",
          "notification_url": "http://www.baidu.com",
          "created_at": "2021-09-09 14:34:40"
        },
        {
          "id": 3,
          "sender": -1,
          "receiver": 2,
          "content": "Notification Message Content 1",
          "status": 1,
          "type": 1,
          "source": "IssueDelete",
          "notification_url": "http://www.baidu.com",
          "created_at": "2021-09-09 14:34:40"
        },
        {
          "id": 4,
          "sender": -1,
          "receiver": 2,
          "content": "Notification Message Content 2",
          "status": 2,
          "type": 1,
          "source": "IssueChanged",
          "notification_url": "http://www.baidu.com",
          "created_at": "2021-09-09 14:34:40"
        },
        {
          "id": 5,
          "sender": -1,
          "receiver": 2,
          "content": "Notification Message Content 3",
          "status": 2,
          "type": 1,
          "source": "ProjectJoined",
          "notification_url": "http://www.baidu.com",
          "created_at": "2021-09-09 14:34:40"
        }
      ],
      "records_count": 5,
      "page_num": 1,
      "total_page_size": 1,
      "page_size": 10
    }
    result = [1, "请求成功", data]
    return render_error if result.nil?
    puts result
    @data = result[2].stringify_keys

  end

  def create
    return render_forbidden unless %w(3).include(@message_type)
    render_ok
  end

  def delete 
    return render_forbidden unless %w(2).include(@message_type)
    render_ok
  end

  def read 
    render_ok
  end

  private 
  def message_type 
    @message_type = begin
      case params[:type]
      when "notification"
        1
      when "atme"
        2
      else 
        -1
      end
    end
  end

  def message_params 
    {
      sender: current_user.id,
      reservers: @receiver.id,
      type: @message_type,
      content: params[:content]
    }
  end


  def find_receiver 
    @receiver = User.find_by(login: params[:receiver_login])
  end
end