class AddValuesToIssueTagsAndTrackers < ActiveRecord::Migration[5.2]
  def change
    issue_status = %w(新增 正在解决 已解决 反馈 关闭 拒绝)
    trackers = %w(缺陷 功能 支持 任务 周报)
    issue_status.each_with_index do |s, index|
      unless IssueStatus.exists?(name: s)
        IssueStatus.create!(name: s, is_closed: (index == 4)  , is_default: (index == 0), position: index+1)
      end
    end

    trackers.each_with_index do |s, index|
      unless Tracker.exists?(name: s)
        Tracker.create!(name: s, is_in_chlog: (index == 0 || index == 1)  , is_in_roadmap: (index != 0 || index != 2), position: index+1)
      end
    end
  end
end
