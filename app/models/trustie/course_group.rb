# == Schema Information
#
# Table name: course_groups
#
#  id                   :integer          not null, primary key
#  name                 :string(255)
#  course_id            :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  members_count        :integer
#  invite_code          :string(255)
#  position             :integer          default("0")
#  course_members_count :integer          default("0")
#  invite_code_halt     :boolean          default("0")
#  invite_code_set      :integer          default("0")
#
# Indexes
#
#  index_course_groups_on_course_id    (course_id)
#  index_course_groups_on_invite_code  (invite_code) UNIQUE
#

class Trustie::CourseGroup < Trustie::Database
  belongs_to :course, class_name: "Trustie::Course"
end
