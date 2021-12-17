# == Schema Information
#
# Table name: competitions
#
#  id                      :integer          not null, primary key
#  title                   :string(255)
#  start_time              :datetime
#  end_time                :datetime
#  identifier              :string(255)
#  available               :boolean          default("0")
#  online_time             :datetime
#  visits                  :integer          default("0")
#  competition_lists_count :integer          default("0")
#  min_num                 :integer          default("1")
#  max_num                 :integer          default("1")
#  enroll_end_time         :datetime
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  status                  :integer          default("0")
#  subtitle                :string(255)
#  team_members_count      :integer          default("0")
#  limit_type              :integer          default("0")
#  show_top                :integer          default("0")
#  content                 :text(65535)
#

class Competition < ApplicationRecord

  enum status: {archived: 0, active: 1}
end
