class CacheAsyncClearJob < ApplicationJob
  queue_as :cache

  def perform(type, id=nil)
    case type 
    when "project_common_service"
      Cache::V2::ProjectCommonService.new(id).clear
    when "owner_common_service"
      Cache::V2::OwnnerCommonService.new(id).clear
    end
  end
end