module Cooperative::RenderHelper
  include Base::RenderHelper

  def render_delete_success
    render_js_template 'cooperative/shared/delete'
  end
  alias_method :render_success_js, :render_delete_success

  def render_js_error(message, type: :alert)
    if type == :notify
      render js: "$.notify({ message: '#{message}' },{ type: 'danger', delay: 5000 });"
    else
      render_js_template 'cooperative/shared/error', locals: { message: message }
    end
  end
end