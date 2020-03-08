module RenderExpand
  extend ActiveSupport::Concern

  included do
    ActionController.add_renderer :pdf do |template, options|
      file = File.open(Rails.root.join('app/templates', template << '.html.erb'))
      html = ERB.new(file.read).result(binding)
      kit = PDFKit.new(html)

      base_css = %w(app/templates/shared/main.css)
      base_css.each { |css| kit.stylesheets << Rails.root.join(css) }

      Array.wrap(options.delete(:stylesheets)).each do |path|
        kit.stylesheets << Rails.root.join('app/templates', path)
      end

      send_data kit.to_pdf, filename: options[:filename], disposition: options[:disposition] || 'attachment', type: 'application/pdf'
    end


    ActionController.add_renderer :exam_pdf do |template, options|
      file = File.open(Rails.root.join('app/templates', template << '.html.erb'))
      html = ERB.new(file.read).result(binding)
      kit = PDFKit.new(html)

      # PDFKit初始化后再添加样式文件到stylesheets，会出现在页面的<!DOCTYPE>定义不起作用，文档模式为默认为BackCompat，从而导致katex不起作用
      # 而测试发现通过配置添加css样式文件不会有影响
      PDFKit.configure do |config|
        config.default_options = {
          :"user-style-sheet" =>  Rails.root.join('app/templates', options[:stylesheets])
        }
      end

      send_data kit.to_pdf, filename: options[:filename], disposition: options[:disposition] || 'attachment', type: 'application/pdf'
    end
  end



end