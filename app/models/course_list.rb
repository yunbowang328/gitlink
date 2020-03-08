class CourseList < ApplicationRecord
  has_many :courses
  has_many :question_banks
  has_many :homework_banks
  has_many :exercise_banks
  has_many :gtask_banks
  has_many :gtopic_banks
  belongs_to :user

  validate :validate_sensitive_string

  def validate_sensitive_string
    raise("课程名称包含敏感词汇，请重新输入") unless HarmoniousDictionary.clean?(name)
  end
end
