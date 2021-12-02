class Home::PlatformCommunicatesController < ApplicationController

  def index
    scope = PlatformCommunicate.order(created_at: :desc)
    @communicates = kaminari_paginate(scope)
  end
end