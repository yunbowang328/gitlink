# == Schema Information
#
# Table name: project_scores
#
#  id                :integer          not null, primary key
#  project_id        :string(255)
#  score             :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  issue_num         :integer          default("0")
#  issue_journal_num :integer          default("0")
#  news_num          :integer          default("0")
#  documents_num     :integer          default("0")
#  changeset_num     :integer          default("0")
#  board_message_num :integer          default("0")
#  board_num         :integer          default("0")
#  attach_num        :integer          default("0")
#  commit_time       :datetime
#  pull_request_num  :integer          default("0")
#

class ProjectScore < ApplicationRecord
  belongs_to :project

  def all_score
    self.issue_num * 4 + self.issue_journal_num + (self.changeset_num||0) * 4 + self.board_num * 2 +
        self.board_message_num + self.attach_num * 5
  end

  # 代码提交得分
  def code_score
    (self.changeset_num||0) * 4
  end

  # issues得分
  def issue_score
    self.issue_num * 4 + self.issue_journal_num
  end

  # 资源得分
  def attachment_score
    self.attach_num * 5
  end

  # 帖子得分
  def message_score
    self.board_message_num
  end

end
