class CacheAsyncSetJob < ApplicationJob
  queue_as :cache

  def perform(type, params={}, id=nil)
    case type 
    when "platform_statistic_service"
      Cache::V2::PlatformStatisticService.new(params).call
    when "project_common_service"
      Cache::V2::ProjectCommonService.new(id, params).call
    when "owner_common_service"
      Cache::V2::OwnnerCommonService.new(id, params).call
    when "user_statistic_service"
      Cache::V2::UserStatisticService.new(id, params).call
    end
  end
end