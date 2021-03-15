# == Schema Information
#
# Table name: stages
#
#  id            :integer          not null
#  subject_id    :integer
#  name          :string(255)
#  description   :text(65535)
#  user_id       :integer
#  position      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shixuns_count :integer          default("0")
#
# Indexes
#
#  index_stages_on_subject_id  (subject_id)
#

class Ci::Stage < Ci::RemoteBase
  self.primary_key = 'stage_id'

  belongs_to :build, foreign_key: :stage_build_id
  has_many :steps, foreign_key: "step_stage_id", dependent: :destroy
end
