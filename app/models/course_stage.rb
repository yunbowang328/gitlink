class CourseStage < ApplicationRecord
  belongs_to :course

  has_many :course_stage_shixuns, -> { order("course_stage_shixuns.position ASC") }, dependent: :destroy
  has_many :shixuns, :through => :course_stage_shixuns

  validates :name, length: { maximum: 60 , too_long: "不能超过60个字符"}
  validates :description, length: { maximum: 1000, too_long: "不能超过1000个字符" }
end
