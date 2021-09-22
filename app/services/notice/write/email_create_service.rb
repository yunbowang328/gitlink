class Notice::Write::EmailCreateService < Notice::Write::ClientService 
  attr_accessor :receivers, :sender, :content, :subject

  def initialize(receivers, content, subject, sender=-1)
    @receivers = receivers
    @sender = sender 
    @content = content 
    @subject = subject 
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
      emails: request_receivers,
      sender: sender,
      content: content,
      subject: subject
    }.stringify_keys)
  end

  def url
    "/email/#{platform}".freeze
  end

end