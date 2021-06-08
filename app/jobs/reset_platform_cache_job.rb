class ResetPlatformCacheJob < ApplicationJob
  queue_as :cache

  def perform
    Cache::PlatformFollowCountService.new.reset
    Cache::PlatformIssueCountService.new.reset 
    Cache::PlatformProjectCountService.new.reset 
    Cache::PlatformProjectForkCountService.new.reset 
    Cache::PlatformProjectLanguagesCountService.new.reset
    Cache::PlatformProjectPraisesCountService.new.reset 
    Cache::PlatformProjectWatchersCountService.new.reset
    Cache::PlatformPullrequestCountService.new.reset
  end
end