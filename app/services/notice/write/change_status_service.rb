class Notice::Write::ChangeStatusService < Notice::Write::ClientService 
  attr_accessor :notification_ids, :receiver, :status

  def initialize(notification_ids, receiver, status=2)
    @notification_ids = notification_ids
    @receiver = receiver
    @status = status
  end

  def call
    result = put("", request_params)
    response = render_response(result)
  end

  private

  def request_notification_ids
    notification_ids.join(",")
  end

  def request_params
    Hash.new.merge(data: {
      notificationIds: request_notification_ids,
      receiver: receiver,
      status: status
    }.stringify_keys)
  end

end