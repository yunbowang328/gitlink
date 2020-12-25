# == Schema Information
#
# Table name: members
#
#  id                  :integer          not null, primary key
#  user_id             :integer          default("0"), not null
#  project_id          :integer          default("0")
#  created_on          :datetime
#  mail_notification   :boolean          default("0"), not null
#  course_id           :integer          default("-1")
#  course_group_id     :integer          default("0")
#  is_collect          :integer          default("1")
#  graduation_group_id :integer          default("0")
#
# Indexes
#
#  index_members_on_course_id               (course_id)
#  index_members_on_project_id              (project_id)
#  index_members_on_user_id                 (user_id)
#  index_members_on_user_id_and_project_id  (user_id,project_id,course_id) UNIQUE
#

class Member < ApplicationRecord
  belongs_to :user
  # belongs_to :course, optional: true
  belongs_to :project, optional: true

  has_many :member_roles, dependent: :destroy
  has_many :roles, through: :member_roles

  validates :user_id, :project_id, presence: true

end
