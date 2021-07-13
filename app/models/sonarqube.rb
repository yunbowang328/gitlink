# == Schema Information
#
# Table name: sonarqubes
#
#  id              :integer          not null, primary key
#  loophole        :integer          default("0")
#  repetition_rate :integer          default("0")
#  bug_num         :integer          default("0")
#  file_num        :integer          default("0")
#  project_id      :integer
#  branch_name     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Sonarqube < ApplicationRecord
  belongs_to :project, optional: true
end
