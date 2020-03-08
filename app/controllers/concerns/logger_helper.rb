module LoggerHelper
  extend ActiveSupport::Concern

  extend LoggerHelper


  # 以用户id开始的日志定义
  def uid_logger(message)
    Rails.logger.info("##:#{current_user.try(:id)} --#{message}")
  end

  # debug日志
  def uid_logger_dubug(message)
    Rails.logger.info("##dubug-#{current_user.try(:id)} --#{message}")

  end

  # 以用户id开始的日志定义
  def uid_logger_error(message)
    Rails.logger.error("##:#{current_user.try(:id)} --#{message}")
  end
end