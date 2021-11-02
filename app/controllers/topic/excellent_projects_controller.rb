class Topic::ExcellentProjectsController < Topic::BaseController

  def index 
    @excellent_projects = kaminari_paginate(Topic::ExcellentProject)
  end
end