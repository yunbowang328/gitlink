class CourseStageShixun < ApplicationRecord
  belongs_to :course
  belongs_to :course_stage, counter_cache: :shixuns_count
  belongs_to :shixun
end
