class CourseVideo < ApplicationRecord
  belongs_to :course
  belongs_to :video
end
