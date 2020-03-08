module ControllerRescueHandler
  extend ActiveSupport::Concern

  included do
    rescue_from Exception do |e|
      Util.logger_error e
      render json: {status: -1, message: e.message}
    end
    rescue_from ActiveRecord::StatementInvalid do |e|
      Util.logger_error e
      render json: {status: -1, message: "接口数据异常"}
    end
    rescue_from NoMethodError do |e|
      Util.logger_error e
      render json: {status: -1, message: "接口方法异常"}
    end

    rescue_from ActionController::UnknownFormat do |e|
      render json: {status: -1, message: "接口调用非JSON格式"}
    end
    # rescue_from ActionView::MissingTemplate, with: :object_not_found
    # rescue_from ActiveRecord::RecordNotFound, with: :object_not_found
    rescue_from Educoder::TipException, with: :tip_show
    rescue_from ::ActionView::MissingTemplate, with: :missing_template
    rescue_from ActiveRecord::RecordNotFound, with: :object_not_found
    rescue_from ActionController::ParameterMissing, with: :render_parameter_missing

    # form validation error
    rescue_from ActiveModel::ValidationError do |ex|
      render_error(ex.model.errors.full_messages.join(','))
    end
    rescue_from ActiveRecord::RecordInvalid do |ex|
      render_error(ex.record.errors.full_messages.join(','))
    end
    # rescue_from RuntimeError do |ex|
    #   Util.logger_error "#######ex:#{ex}"
    #   render_error(ex.message)
    # end
  end
end