require 'multi_logger'
formatter = Proc.new{|severity, time, progname, msg|
  formatted_severity = sprintf("%-5s",severity.to_s)
  formatted_time = time.strftime("%Y-%m-%d %H:%M:%S")
  # "[#{formatted_severity} #{formatted_time} #{$$}] #{msg.to_s.strip}\n"
  "#{msg.to_s.strip}\n"
}
MultiLogger.add_logger('user_trace', formatter: formatter, shift_age: 'daily')
Rails.logger.user_trace.level = Logger::INFO
