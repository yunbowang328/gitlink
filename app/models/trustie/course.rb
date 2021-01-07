class Trustie::Course < Trustie::Database
  has_many :course_groups, class_name: "Trustie::CourseGroup"
  has_many :homework_commons, class_name: "Trustie::HomeworkCommon"
end