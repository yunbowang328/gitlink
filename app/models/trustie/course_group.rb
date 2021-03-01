class Trustie::CourseGroup < Trustie::Database
  belongs_to :course, class_name: "Trustie::Course"
end