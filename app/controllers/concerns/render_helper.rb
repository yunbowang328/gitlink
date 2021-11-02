module RenderHelper
  def render_ok(data = {})
    render json: { status: 0, message: 'success' }.merge(data)
  end

  def render_error(message = '')
    render json: { status: -1, message: message }
  end

  def render_not_acceptable(message = '请求已拒绝')
    render json: { status: 406, message: message }
  end

  def render_not_found(message = I18n.t('error.record_not_found'))
    render json: { status: 404, message: message }
    # render status: 404, json: { errors: errors }
  end

  def render_forbidden(message = I18n.t('error.forbidden'))
    render json: { status: 403, message: message }
    # render status: 403, json: { errors: errors }
  end

  def render_unauthorized(message = I18n.t('error.unauthorized'))
    render json: { status: 401, message: message }
  end

  def render_result(status=1, message='success')
    render json: { status: status, message: message }
  end
end
