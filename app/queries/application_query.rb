class ApplicationQuery
  include Callable

  private

  def strip_param(key)
    params[key].to_s.strip.presence
  end
end