class SyncLog
  def self.sync_log(message=nil)
    @my_log ||= Logger.new("#{Rails.root}/log/sync.log")
    @my_log.debug(message) unless message.nil?
  end
end