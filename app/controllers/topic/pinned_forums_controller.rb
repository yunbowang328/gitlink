class Topic::PinnedForumsController < Topic::BaseController

  def index
    @pinned_forums = kaminari_paginate(Topic::PinnedForum) 
  end
end