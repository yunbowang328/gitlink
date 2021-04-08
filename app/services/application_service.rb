class ApplicationService
  include Callable

  Error = Class.new(StandardError)

  def regix_emoji content
    " " if content.blank?
    regex = /[^a-zA-Z0-9\u4E00-\u9FFF]/
    content.gsub(regex, '')
  end

  private

  def strip(str)
    str.to_s.strip.presence
  end

  def str_to_boolean str
    ActiveModel::Type::Boolean.new.cast str
  end
end
