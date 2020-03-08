module Base::ErrorRescueHandler
  extend ActiveSupport::Concern

  included do
    rescue_from Exception do |e|
      raise e if Rails.env.development?

      Util.logger_error e
      internal_server_error
    end

    rescue_from ActionView::MissingTemplate, ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActionController::ParameterMissing do
      render_unprocessable_entity('参数缺失')
    end
    # form validation error
    rescue_from ActiveModel::ValidationError do |ex|
      render_unprocessable_entity(ex.model.errors.full_messages.join(','))
    end
    rescue_from ActiveRecord::RecordInvalid do |ex|
      ex.backtrace.each { |msg| Rails.logger.error(msg) }
      render_unprocessable_entity(ex.record.errors.full_messages.join(','))
    end
  end
end