class SendTemplateMessageJob < ApplicationJob
  queue_as :default

  def perform(source, *args)
    Rails.logger.info "SendTemplateMessageJob [args] #{args}"
    case source 
    when 'FollowTip'
      receivers, followeder = args
      Rails.logger.info "#{receivers} #{followeder}"
    end
  end
end