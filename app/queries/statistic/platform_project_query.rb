class Statistic::PlatformProjectQuery < ApplicationQuery
  attr_reader :params 

  def initialize(params)
    @params = params 
  end

  def call 
    project_total_count = Project.count
    project_active_count = Project.where("updated_on > ? and updated_on < ?", start_time, end_time).count
    project_fresh_count = Project.where("created_on > ? and created_on < ?", start_time, end_time).count

    [project_total_count, project_active_count, project_fresh_count]
  end

  private 
  def start_time
    Time.at(params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i)
  end

  def end_time
    Time.at(params.fetch(:end_time, Time.now.to_i).to_i)
  end
end