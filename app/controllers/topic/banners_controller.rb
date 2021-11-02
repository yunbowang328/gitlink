class Topic::BannersController < Topic::BaseController

  def index 
    @banners = kaminari_paginate(Topic::Banner)
  end
end