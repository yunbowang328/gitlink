class Home::CompetitionsController < ApplicationController

  def index
    @competitions = Competition.active.order(start_time: :desc).limit(3)
  end
end