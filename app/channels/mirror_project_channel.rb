class MirrorProjectChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info "################### channel params: #{params}"
    # @project = Project.find_by_identifier params[:id]
    stream_from "channel_room_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    Rails.logger.info "################### unsubscribed ################### "
  end
end
