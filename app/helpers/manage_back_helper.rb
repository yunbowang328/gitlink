module ManageBackHelper
  extend ActiveSupport::Concern

  def sidebar_item_group(url, text, **opts)
    link_opts = url.start_with?('/') ? {} : { 'data-toggle': 'collapse', 'aria-expanded': false }
    content =
      link_to url, link_opts do
        content_tag(:i, '', class: "fa fa-#{opts[:icon]}", 'data-toggle': 'tooltip', 'data-placement': 'right', 'data-boundary': 'window', title: text) +
          content_tag(:span, text)
      end

    content +=
      content_tag(:ul, id: url[1..-1], class: 'collapse list-unstyled', "data-parent": '#sidebar') do
        yield
      end

    raw content
  end

  def sidebar_item(url, text, **opts)
    content =
      link_to url, 'data-controller': opts[:controller] do
        content_tag(:i, '', class: "fa fa-#{opts[:icon]} fa-fw", 'data-toggle': 'tooltip', 'data-placement': 'right', 'data-boundary': 'window', title: text) +
          content_tag(:span, text)
      end

    raw content
  end

  def admin_sidebar_controller
    key = params[:controller].to_s.gsub(/\//, '-')
    SidebarUtil.controller_name(key) || key
  end
  alias_method :sidebar_controller, :admin_sidebar_controller

  def define_admin_breadcrumbs(&block)
    content_for(:setup_admin_breadcrumb, &block)
  end
  alias_method :define_breadcrumbs, :define_admin_breadcrumbs

  def add_admin_breadcrumb(text, url = nil)
    @_breadcrumbs ||= []
    @_breadcrumbs << OpenStruct.new(text: text, url: url)
  end
  alias_method :add_breadcrumb, :add_admin_breadcrumb

  def display_text(str, default = '--')
    str.presence || default
  end

  def overflow_hidden_span(text, width: 300, placement: nil)
    opts = { class: 'd-inline-block text-truncate', style: "max-width: #{width}px" }
    opts.merge!('data-toggle': 'tooltip', title: text) if text != '--'
    opts.merge!('data-placement': placement) if placement

    content_tag(:span, text, opts)
  end

  def sort_tag(content = '', **opts)
    options = {}
    options[:sort_by] = opts.delete(:name)
    is_current_sort = params[:sort_by].to_s == options[:sort_by]
    options[:sort_direction] = is_current_sort && params[:sort_direction].to_s == 'desc' ? 'asc' : 'desc'

    path = opts.delete(:path) + "?" + unsafe_params.merge(options).to_query
    arrow_class = case params[:sort_direction].to_s
                  when 'desc' then 'fa-sort-amount-desc'
                  when 'asc' then 'fa-sort-amount-asc'
                  else ''
                  end
    opts[:style] = "#{opts[:style]} ;position: relative;"

    content_tag(:span, opts) do
      link_to path, remote: true do
        content = content_tag(:span) { yield } if block_given?

        content += content_tag(:i, '', class: "fa color-light-green ml-1 #{arrow_class}", style: 'position: absolute;top:0;') if is_current_sort
        raw content
      end
    end
  end

  def javascript_void_link(name, **opts)
    raw link_to(name, 'javascript:void(0)', opts)
  end

  def agree_link(name, url, **opts)
    klass = ['action agree-action', opts.delete(:class)].compact.join(' ')

    refresh_url_data = "refresh_url=#{CGI::escape(request.fullpath)}"
    url = url + (url.index('?') ? '&' : '?') + refresh_url_data

    raw link_to(name, url, { method: :post, remote: true, class: klass, 'data-confirm': '确认审核通过？'}.merge(opts))
  end

  def delete_link(name, url, **opts, &block)
    klass = ['action delete-action', opts.delete(:class)].compact.join(' ')

    refresh_url_data = "refresh_url=#{CGI::escape(request.fullpath)}"
    url = url + (url.index('?') ? '&' : '?') + refresh_url_data

    if block_given?
      raw link_to(url, { method: :delete, remote: true, class: klass, 'data-confirm': '确认删除？'}.merge(opts), &block)
    else
      raw link_to(name, url, { method: :delete, remote: true, class: klass, 'data-confirm': '确认删除？'}.merge(opts))
    end
  end

  def unsafe_params
    params.except(:controller, :action).to_unsafe_h
  end

  def list_index_no(page,index)
    (page - 1) * 20 + index + 1
  end
end