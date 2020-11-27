# == Schema Information
#
# Table name: user_grades
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  project_id :integer          not null
#  grade      :float(24)        default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_user_grades_on_grade       (grade)
#  index_user_grades_on_project_id  (project_id)
#  index_user_grades_on_user_id     (user_id)
#

class UserGrade < ApplicationRecord
  # belongs_to :project
  # belongs_to :user
end
