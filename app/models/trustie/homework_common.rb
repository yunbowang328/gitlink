# == Schema Information
#
# Table name: homework_commons
#
#  id                          :integer          not null, primary key
#  name                        :string(255)
#  user_id                     :integer
#  description                 :text(65535)
#  publish_time                :datetime
#  end_time                    :datetime
#  homework_type               :integer          default("1")
#  late_penalty                :string(255)      default("0")
#  course_id                   :integer
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  teacher_priority            :integer          default("1")
#  anonymous_comment           :boolean          default("0")
#  quotes                      :integer          default("0")
#  is_open                     :integer          default("0")
#  simi_time                   :datetime
#  score_open                  :boolean          default("0")
#  anonymous_appeal            :boolean          default("0")
#  homework_bank_id            :integer
#  is_update                   :boolean          default("0")
#  is_public                   :boolean          default("0")
#  reference_answer            :text(65535)
#  answer_public               :boolean          default("0")
#  archive_time                :datetime
#  allow_late                  :boolean          default("0")
#  late_time                   :datetime
#  work_public                 :boolean          default("0")
#  explanation                 :text(65535)
#  unified_setting             :boolean          default("1")
#  comment_public              :boolean          default("1")
#  course_homework_category_id :integer
#  work_efficiency             :boolean          default("0")
#  eff_score                   :float(24)        default("0")
#  max_efficiency              :float(24)        default("0")
#  course_second_category_id   :integer          default("0")
#  calculation_time            :datetime
#  position                    :integer          default("0")
#  total_score                 :float(24)        default("100")
#  category_position           :integer          default("0")
#
# Indexes
#
#  index_homework_commons_on_course_id_and_id           (course_id,id)
#  index_homework_commons_on_course_second_category_id  (course_second_category_id)
#  index_homework_commons_on_homework_bank_id           (homework_bank_id)
#

class Trustie::HomeworkCommon < Trustie::Database
  belongs_to :course, class_name: "Trustie::Course"
end
