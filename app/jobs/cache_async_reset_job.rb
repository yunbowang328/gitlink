class CacheAsyncResetJob < ApplicationJob
  queue_as :cache

  def perform(type, id, params={})
    case type 
    when "owner_common_service"
      Cache::V2::OwnerCommonService.new(id).reset
    when "platform_statistic_service"
      Cache::V2::PlatformStatisticService.new.reset
    when "project_common_service"
      Cache::V2::ProjectCommonService.new(id).reset
    when "user_statistic_service"
      Cache::V2::PlatformStatisticService.new(id).reset
    end
  end
end