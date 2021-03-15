# == Schema Information
#
# Table name: courses
#
#  id                         :integer          not null, primary key
#  tea_id                     :integer
#  name                       :string(255)
#  state                      :integer
#  code                       :string(255)
#  time                       :integer
#  extra                      :string(255)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  location                   :string(255)
#  term                       :string(255)
#  string                     :string(255)
#  password                   :string(255)
#  setup_time                 :string(255)
#  endup_time                 :string(255)
#  class_period               :integer          default("0")
#  school_id                  :integer
#  description                :text(65535)
#  status                     :integer          default("1")
#  attachmenttype             :integer          default("2")
#  lft                        :integer
#  rgt                        :integer
#  is_public                  :integer          default("1")
#  inherit_members            :integer          default("1")
#  open_student               :integer          default("0")
#  outline                    :integer          default("0")
#  publish_resource           :integer          default("0")
#  is_delete                  :integer          default("0")
#  end_time                   :integer
#  end_term                   :string(255)
#  is_excellent               :integer          default("0")
#  excellent_option           :integer          default("0")
#  is_copy                    :integer          default("0")
#  visits                     :integer          default("0")
#  syllabus_id                :integer
#  invite_code                :string(255)
#  qrcode                     :string(255)
#  qrcode_expiretime          :integer          default("0")
#  invite_code_halt           :integer          default("0")
#  os_allow                   :integer          default("0")
#  credit                     :float(24)
#  is_end                     :boolean          default("0")
#  end_date                   :date
#  choose_group_allow         :boolean          default("0")
#  homepage_show              :boolean          default("0")
#  course_list_id             :integer
#  members_count              :integer          default("0")
#  homework_commons_count     :integer          default("0")
#  show_unit                  :boolean          default("0")
#  teacher_list               :string(255)      default("老师")
#  student_list               :string(255)      default("学生")
#  is_hidden                  :boolean          default("0")
#  course_members_count       :integer          default("0")
#  course_groups_count        :integer          default("0")
#  authentication             :boolean          default("0")
#  professional_certification :boolean          default("0")
#  graduation_topics_count    :integer          default("0")
#  graduation_tasks_count     :integer          default("0")
#  polls_count                :integer          default("0")
#  exercises_count            :integer          default("0")
#  start_date                 :date
#  subject_id                 :integer          default("0")
#  excellent                  :boolean          default("0")
#  email_notify               :boolean          default("0")
#  sticky                     :boolean          default("0")
#  sticky_time                :datetime
#  laboratory_id              :integer
#  mooc_course_id             :integer
#
# Indexes
#
#  index_courses_on_invite_code              (invite_code) UNIQUE
#  index_courses_on_laboratory_id            (laboratory_id)
#  index_courses_on_mooc_course_id           (mooc_course_id)
#  index_courses_on_school_id_and_is_delete  (school_id,is_delete)
#  index_courses_on_subject_id               (subject_id)
#  index_courses_on_tea_id                   (tea_id)
#

class Trustie::Course < Trustie::Database
  has_many :course_groups, class_name: "Trustie::CourseGroup"
  has_many :homework_commons, class_name: "Trustie::HomeworkCommon"
end
