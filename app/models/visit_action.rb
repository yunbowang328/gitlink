class VisitAction < ApplicationRecord
  belongs_to :visitable, polymorphic: true

  def self.search_by_time(time_type, start_time, end_time)
    where("#{time_type} between ? and ?",start_time.present? ? start_time.to_time : Time.now, end_time.present? ? end_time.to_time.end_of_day : Time.now)
  end
end
