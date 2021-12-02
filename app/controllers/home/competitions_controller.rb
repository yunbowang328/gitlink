class Home::CompetitionsController < ApplicationController

  def index
    @competitions = Competition.active.order(start_time: :desc).limit(3)
    if @competitions.size < 3 
      @competitions += Competition.archived.order(start_time: :desc).limit(3-@competitions.size)
    end
  end
end