class Notice::Write::CreateService < Notice::Write::ClientService 
  attr_accessor :receivers, :sender, :content, :notification_url, :source, :extra, :type

  def initialize(receivers, content, notification_url, source, extra={}, type=1, sender=-1)
    @receivers = receivers
    @sender = sender 
    @content = content 
    @notification_url = notification_url 
    @source = source 
    @extra = extra 
    @type = type
  end

  def call
    return nil if request_receivers.blank?
    result = post(url, request_params)
    response = render_response(result)
  end

  private

  def request_receivers
    receivers.is_a?(Array) ? receivers.join(",") : receivers
  end

  def request_params
    Hash.new.merge(data: {
      receivers: request_receivers,
      sender: sender,
      content: content, 
      notification_url: notification_url,
      source: source,
      extra: extra.to_json.to_s,
      type: type
    }.stringify_keys)
  end

  def url
    "/notification/#{platform}".freeze
  end

end