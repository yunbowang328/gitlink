class Home::PlatformCommunicatesController < ApplicationController

  def index
    scope = PlatformCommunicate.order(order_index: :desc)
    @communicates = kaminari_paginate(scope)
  end
end