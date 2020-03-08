class ApplicationImport
  Error = Class.new(StandardError)

  def logger(msg)
    Rails.logger.error(msg)
  end

  def raise_import_error(message)
    raise Error, message
  end
end