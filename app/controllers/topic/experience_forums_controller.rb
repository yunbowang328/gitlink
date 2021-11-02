class Topic::ExperienceForumsController < Topic::BaseController

  def index 
    @experience_forums = kaminari_paginate(Topic::ExperienceForum)
  end
end