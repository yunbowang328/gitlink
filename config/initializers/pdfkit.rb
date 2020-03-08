PDFKit.configure do |config|
  config.wkhtmltopdf = ENV["WKHTMLTOPDF_EXEC"] || 'wkhtmltopdf'
  # config.wkhtmltopdf = ENV["WKHTMLTOPDF_EXEC"] || '/usr/bin/wkhtmltopdf'
  config.default_options = {
      encoding: "UTF-8",
      page_size: 'A4',
      print_media_type: true,
      dpi: 300,
      debug_javascript: true,
      javascript_delay: 500,
      # quiet: false
      stop_slow_scripts:false,
      no_stop_slow_scripts: true
  }
end

# 原有方法会给所有含 head 标签的地方插入css，导致html类实训代码块渲染异常
module FixStylesheetAppend
  def append_stylesheets
    raise ImproperSourceError.new('Stylesheets may only be added to an HTML source') if stylesheets.any? && !@source.html?

    stylesheets.each do |stylesheet|
      @source.to_s.insert(0, style_tag_for(stylesheet))
    end
  end
end
PDFKit.prepend(FixStylesheetAppend)
