class Notice::Write::DeleteService < Notice::Write::ClientService 
  attr_accessor :notification_ids, :receiver

  def initialize(notification_ids, receiver)
    @notification_ids = notification_ids
    @receiver = receiver
  end

  def call
    result = delete("", request_params)
    response = render_response(result)
  end

  private

  def request_notification_ids
    notification_ids.join(",")
  end

  def request_params
    Hash.new.merge(data: {
      notificationIds: request_notification_ids,
      receiver: receiver
    }.stringify_keys)
  end

end