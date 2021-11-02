class Topic::CooperatorsController < Topic::BaseController

  def index 
    @cooperators = kaminari_paginate(Topic::Cooperator)
  end
end