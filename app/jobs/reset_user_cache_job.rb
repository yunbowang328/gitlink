class ResetUserCacheJob < ApplicationJob
  queue_as :cache

  def perform(user)
    Cache::UserFollowCountService.new(user).reset
    Cache::UserIssueCountService.new(user).reset 
    Cache::UserProjectCountService.new(user).reset 
    Cache::UserProjectForkCountService.new(user).reset 
    Cache::UserProjectLanguagesCountService.new(user).reset
    Cache::UserProjectPraisesCountService.new(user).reset 
    Cache::UserProjectWatchersCountService.new(user).reset
    Cache::UserPullrequestCountService.new(user).reset
  end
end