module Base::RenderHelper
  extend ActiveSupport::Concern

  def render_by_format(hash)
    format = request.format.symbol
    hash.key?(format) ? hash[format].call : hash[:html].call
  end

  def render_forbidden
    render_by_format(html: -> { current_user&.business? ? render('shared/403') : redirect_to('/403') },
                     js: -> { render_js_error(I18n.t('error.forbidden'), type: :notify) },
                     json: -> { render status: 403, json: { messages: I18n.t('error.forbidden') } } )
  end

  def render_not_found
    render_by_format(html: -> { render 'shared/404' },
                     js: -> { render_js_error('资源未找到') },
                     json: -> { render status: 404, json: { message: '资源未找到' } })
  end

  def render_unprocessable_entity(message, type: :alert)
    render_by_format(html: -> { render 'shared/422' },
                     js: -> { render_js_error(message, type: type) },
                     json: -> { render status: 422, json: { message: message } })
  end
  alias_method :render_error, :render_unprocessable_entity

  def internal_server_error(message = '系统错误')
    @message = message
    render_by_format(html: -> { render 'shared/500' },
                     js: -> { render_js_error(message) },
                     json: -> { render status: 500, json: { message: message } })
  end

  def render_js_template(template, **opts)
    render({ template: template, formats: :js }.merge(opts))
  end
end