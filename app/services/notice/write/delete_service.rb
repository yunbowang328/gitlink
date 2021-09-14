class Notice::Write::DeleteService < Notice::Write::ClientService 
  attr_accessor :notification_ids, :receiver, :type

  def initialize(notification_ids, receiver, type=-1)
    @notification_ids = notification_ids
    @receiver = receiver
    @type = type
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
      receiver: receiver,
      type: type
    }.stringify_keys)
  end

end