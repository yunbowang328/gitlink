class Journal < ApplicationRecord
  belongs_to :user
  belongs_to :issue, foreign_key: :journalized_id, :touch => true
  has_many :journal_details, :dependent => :delete_all
  has_many :attachments, as: :container, dependent: :destroy

  scope :journal_includes, ->{includes(:user, :journal_details, :attachments)}
  scope :parent_journals, ->{where(parent_id: nil)}
  scope :children_journals, lambda{|journal_id| where(parent_id: journal_id)}


  def is_journal_detail?
    self.notes.blank? && self.journal_details.present?
  end

  def journal_content
    send_details = []
    if self.is_journal_detail?
      details = self.journal_details.select(:property, :prop_key, :old_value, :value).pluck(:property, :prop_key, :old_value, :value)
      if details.size > 0
        details.each do |de|
          unless de[1] == "description"
            if de[0] == "attr"
              content = ""
            else
              content = "附件"
            end
            old_value = de[2]
            value = de[3]
            if de[1].to_i > 0
              prop_name = ""
            else
              prop_name = I18n.t("journal_detail.#{de[1]}")
              case de[1]
              when "is_private"
                old_value = I18n.t("journal_detail.#{de[2]}")
                value = I18n.t("journal_detail.#{de[3]}")
              when "assigned_to_id"
                u = User.select(:id, :login, :lastname, :firstname, :nickname)
                old_value = de[2].to_i > 0 ? u.find_by_id(de[2]).try(:show_real_name) : ""
                assign_user = de[3].to_i > 0 ? u.find_by_id(de[3]) : ""
                if assign_user.present?
                  value = assign_user.try(:show_real_name)
                else
                  value = ""
                end

              when "tracker_id"
                t = Tracker.select(:id, :name)
                old_value = de[2].to_i > 0 ? t.find_by_id(de[2]).try(:name) : ""
                tracker_name = de[3].to_i > 0 ? t.find_by_id(de[3]) : ""
                if tracker_name
                  value = tracker_name.try(:name)
                else
                  value = ""
                end

              when "status_id"
                t = IssueStatus.select(:id, :name)
                old_value = de[2].to_i > 0 ? t.find_by_id(de[2]).try(:name) : ""
                type_name = de[3].to_i > 0 ? t.find_by_id(de[3]) : ""
                if type_name
                  value = type_name.try(:name)
                else
                  value = ""
                end
              when "priority_id"
                t = IssuePriority.select(:id, :name)
                old_value = de[2].to_i > 0 ? t.find_by_id(de[2]).try(:name): ""
                type_name = de[3].to_i > 0 ? t.find_by_id(de[3]) : ""
                if type_name
                  value = type_name.try(:name)
                else
                  value = ""
                end
              when "issue_tags_value"
                t = IssueTag.select(:id, :name)
                old_value = de[2].to_i > 0 ? t.where(id: de[2].split(",")).select(:id,:name,:color).as_json : ""
                if de[3].present?
                  value = t.where(id: de[3].split(",")).select(:id,:name,:color).as_json
                else
                  value = ""
                end
              when "fixed_version_id"
                t = Version.select(:id, :name)
                old_value = de[2].to_i > 0 ? t.find_by_id(de[2]).try(:name) : ""
                type_name = de[3].to_i > 0 ? t.find_by_id(de[3]) : ""
                if type_name
                  value = type_name.try(:name)
                else
                  value = ""
                end
              when "end_time"
                t = IssueTime.select(:id, :start_time, :end_time)
                type_name = de[2].to_i > 0 ? t.find_by_id(de[2]) : ""
                if type_name.present?
                  old_value = "停止工作"
                  d_value = type_name.end_time.to_i - type_name.start_time.to_i
                  value = "#{Time.at(d_value).utc.strftime('%H h %M min %S s')}"
                else
                  old_value = "停止工作"
                  value = ""
                end
              when "issue_depend"
                t = Issue.select(:id,:subject )
                type_name = de[3].present? ? t&.find_by_id(de[3]) : ""
                if type_name.present?
                  old_value = "增加依赖"
                  value = {
                    id: de[3],
                    name: type_name.try(:subject)
                  }
                else
                  old_value = "增加依赖"
                  value = ""
                end
              when "destroy_issue_depend"
                t = Issue.select(:id,:subject )
                type_name = de[3].present? ? t&.find_by_id(de[3]) : ""
                if type_name.present?
                  old_value = "删除依赖"
                  value = {
                    id: de[3],
                    name: type_name.try(:subject)
                  }
                else
                  old_value = "删除依赖"
                  value = ""
                end
              when "done_ratio"
                old_value = "#{de[2]}%"
                value = "#{de[3]}%"
              else
                old_value = de[2]
                value = de[3]
              end
            end
            prop_hash = {
              detail: (content + prop_name),
              old_value: old_value,
              value: value
            }
            send_details.push(prop_hash)
          end
        end
      end
    end
    send_details
  end


end