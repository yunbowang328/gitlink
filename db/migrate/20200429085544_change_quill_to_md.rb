class ChangeQuillToMd < ActiveRecord::Migration[5.2]
  #迁移quill编辑器的内容为md
  def change
    migrate_time = Time.current - 20.days

    all_issues = Issue.where("updated_on > ?", migrate_time)
    pros = PullRequest.where("updated_at > ?", migrate_time)
    journals = Journal.where("created_on > ?", migrate_time)


    # Issue.transaction do
    #   if all_issues.size > 0
    #     all_issues.each do |i|
    #       description = i.description
    #       if description.present? && description.include?("insert")
    #         new_content = change_content(description)
    #         i.update_attribute(:description, new_content)
    #       end
    #       puts "__update_issue_content_____id:#{i.id}__"
    #     end
    #   end
    # end

    # Journal.transaction do
    #   if journals.size > 0
    #     journals.each do |j|
    #       description = j.notes
    #       if description.present? && description.include?("insert")
    #         new_content = change_content(description)
    #         j.update_attribute(:notes, new_content)
    #       end
    #       puts "__update_journal_content_____id:#{j.id}__"
    #     end
    #   end
    #
    # end

    # PullRequest.transaction do
    #   if pros.size > 0
    #     pros.each do |p|
    #       description = p.body
    #       if description.present? && description.include?("insert")
    #         new_content = change_content(description)
    #         p.update_attribute(:body, new_content)
    #       end
    #       puts "__update_pull_request_content_____id:#{p.id}__"
    #     end
    #   end
    # end
  end

  # def change_content(content)
  #   puts "####________content_____######{content}"
  #   new_content = ""
  #   return "" if content.blank?
  #   desc = JSON.parse(content)["ops"]
  #   if desc.length > 0
  #     desc.each do |d|
  #       image = d["insert"]["image"]
  #       if image.present?
  #         new_content += "![#{image['alt']}](#{image['url']})"
  #       else
  #         new_content += d["insert"].gsub("\n", "")
  #       end
  #     end
  #   end
  #   new_content
  # end
end
