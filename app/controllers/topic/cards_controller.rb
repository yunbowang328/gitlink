class Topic::CardsController < Topic::BaseController

  def index 
    @cards = kaminari_paginate(Topic::Card)
  end
end