module IssuesHelper

  def issue_status
    {
      "新增": "1",
      "正在解决": "2",
      "已解决": "3",
      "反馈": "4",
      "关闭": "5",
      "拒绝": "6"
    }
  end

  def version_status
    {
      "开启": "open",
      "关闭": "closed",
      "锁定": "locked"
    }

  end

  def children_content(journal_id)
    children_journals = Journal.children_journals(journal_id).journal_includes
    children_journal_content = []
    if children_journals.present?
      children_journals.each do |j|
        journal_info = {
          id: j.id,
          content: j.try(:notes),
          format_time: time_from_now(j.created_on),
          created_at: format_time(j.created_on),
          user_name: j.user.try(:show_real_name),
          user_login: j.user.try(:login),
          user_pictrue: url_to_avatar(j.user)
        }
        children_journal_content.push(journal_info)
      end
    end
    children_journal_content
  end

  # def get_issue_tags(issue_tag_ids)
  #   IssueTag.where(id: issue_tag_ids).select(:id,:name,:color).as_json
  # end

end