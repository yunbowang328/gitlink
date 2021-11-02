class Topic::ActivityForumsController < Topic::BaseController

  def index 
    @activity_forums = kaminari_paginate(Topic::ActivityForum)
  end
end