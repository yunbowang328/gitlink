class Admins::BaseController < ApplicationController
  include Base::PaginateHelper
  include Admins::RenderHelper
  include Base::ErrorRescueHandler

  layout 'admin'

  skip_before_action :verify_authenticity_token
  before_action :require_login, :require_admin!

  after_action :rebind_event_if_ajax_render_partial
  skip_before_action :check_sign

  private

  def require_login
    User.current = User.find 1
    return if User.current.logged?

    redirect_to "/login?back_url=#{CGI::escape(request.fullpath)}"
  end

  def require_admin!
    return if current_user.blank? || !current_user.logged?
    return if current_user.admin_or_business?

    render_forbidden
  end

  # 触发after ajax render partial hooks，执行一些因为局部刷新后失效的绑定事件
  def rebind_event_if_ajax_render_partial
    return if request.format.symbol != :js
    return if response.content_type != 'text/javascript'

    path = Rails.root.join('app/views/admins/shared/after_render_js_hook.js.erb')
    return unless File.exists?(path)

    append_js = ERB.new(File.open(path).read).result
    response.body += append_js
  end

  # 重写此方法，防止影响超级管理员端云上实验室功能，因为那里重写了:current_laboratory方法
  def setup_laboratory
    Laboratory.current = Laboratory.find_by_subdomain(request.subdomain) || Laboratory.find(1)
  end
end
