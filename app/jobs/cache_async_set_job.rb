class CacheAsyncResetJob < ApplicationJob
  queue_as :cache

  def perform(type, id, params={})
    case type 
    when "platform_statistic_service"
      Cache::V2::PlatformStatisticService.new(params).call
    when "project_common_service"
      Cache::V2::ProjectCommonService.new(id, params).call
    when "user_statistic_service"
      Cache::V2::PlatformStatisticService.new(id, params).call
    end
  end
end