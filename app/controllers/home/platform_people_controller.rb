class Home::PlatformPeopleController < ApplicationController

  def index
    scope = PlatformPerson.order(created_at: :desc)
    @people = kaminari_paginate(scope)
  end
end