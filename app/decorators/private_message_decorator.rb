module PrivateMessageDecorator
  extend ApplicationDecorator

  display_time_method :send_time

  def unread?
    status.zero?
  end
end