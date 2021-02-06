class Statistic::PlatformCourseQuery < ApplicationQuery
  attr_reader :params 

  def initialize(params)
    @params = params 
  end

  def call 
    Trustie::Database.set_connection
    course_total_count = Trustie::Course.count
    course_active_count = Trustie::Course.joins(:course_groups)
                            .where("course_groups.created_at > ? and course_groups.created_at < ?", start_time, end_time).count 
                          +
                          Trustie::Course.joins(:homework_commons)
                            .where("homework_commons.created_at > ? and homework_commons.created_at < ?", start_time, end_time).count
    course_fresh_count = Trustie::Course.where("created_at > ? and created_at < ?", start_time, end_time).count

    [course_total_count, course_active_count, course_fresh_count]
  end

  private 
  def start_time
    Time.at(params.fetch(:start_time, Time.now.beginning_of_day.to_i).to_i)
  end

  def end_time
    Time.at(params.fetch(:end_time, Time.now.to_i).to_i)
  end
end