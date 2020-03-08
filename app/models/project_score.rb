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
