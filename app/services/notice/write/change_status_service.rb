class Notice::Write::ChangeStatusService < Notice::Write::ClientService 
  attr_accessor :notification_ids, :receiver, :type, :status

  def initialize(notification_ids, receiver, type=-1, status=2)
    @notification_ids = notification_ids
    @receiver = receiver
    @type = type
    @status = status
  end

  def call
    result = put(url, request_params)
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
      type: type,
      status: status
    }.stringify_keys)
  end

  def url
    "/notification/#{platform}".freeze
  end

end