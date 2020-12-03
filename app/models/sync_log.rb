class SyncLog
  def self.sync_log(message=nil)
    @my_log ||= Logger.new("#{Rails.root}/log/sync.log")
    @my_log.debug(message) unless message.nil?
  end

  def self.sync_project_log(message=nil)
    @my_log ||= Logger.new("#{Rails.root}/log/sync_project_log.log")
    @my_log.debug(message) unless message.nil?
  end

  def self.empty_repo_project_log(message=nil)
    empt_log ||= Logger.new("#{Rails.root}/log/empty_repo_project_log.log")
    empt_log.debug(message) unless message.nil?
  end
end