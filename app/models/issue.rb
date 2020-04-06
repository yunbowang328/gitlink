class Issue < ApplicationRecord
  #issue_type 1为普通，2为悬赏
  belongs_to :project, :counter_cache => true
  belongs_to :tracker,optional: true
  has_many :project_trends, as: :trend, dependent: :destroy
  has_one :pull_request
  # belongs_to :issue_tag,optional: true
  belongs_to :priority, :class_name => 'IssuePriority', foreign_key: :priority_id,optional: true
  belongs_to :version, foreign_key: :fixed_version_id,optional: true, counter_cache: true
  belongs_to :user,optional: true, foreign_key: :author_id
  belongs_to :issue_status, foreign_key: :status_id,optional: true
  has_many :commit_issues
  has_many :attachments, as: :container, dependent: :destroy
  has_many :memos
  has_many :journals, :as => :journalized, :dependent => :destroy
  has_many :journal_details, through: :journals
  has_many :issue_tags_relates, dependent: :destroy
  has_many :issue_tags, through: :issue_tags_relates
  has_many :issue_times, dependent: :destroy
  has_many :issue_depends, dependent: :destroy
  scope :issue_includes, ->{includes(:user)}
  scope :issue_many_includes, ->{includes(journals: :user)}
  scope :issue_issue, ->{where(issue_classify: [nil,"issue"])}
  scope :issue_pull_request, ->{where(issue_classify: "pull_request")}

  after_update :change_versions_count


  def get_assign_user
    User.select(:login, :lastname,:firstname, :nickname)&.find_by_id(self.assigned_to_id)
  end

  def create_journal_detail(change_files, issue_files, issue_file_ids)
    journal_params = {
      journalized_id: self.id, journalized_type: "Issue", user_id: self.author_id
    }
    journal = Journal.new journal_params

    if journal.save
      if change_files
        old_attachment_names = self.attachments.select(:filename,:id).where(id: issue_file_ids).pluck(:filename).join(",")
        new_attachment_name = self.attachments.select(:filename,:id).where(id: issue_files).pluck(:filename).join(",")
        journal.journal_details.create(property: "attachment", prop_key: "#{issue_files.size}", old_value: old_attachment_names, value: new_attachment_name)
      end
      change_values = %w(subject description is_private assigned_to_id tracker_id status_id priority_id fixed_version_id start_date due_date estimated_hours done_ratio issue_tags_value issue_type token branch_name)
      change_values.each do |at|
        if self.send("saved_change_to_#{at}?")
          journal.journal_details.create(property: "attr", prop_key: "#{at}", old_value: self.send("#{at}_before_last_save"), value: self.send(at))
        end
      end
    end
  end

  def custom_journal_detail(prop_key, old_value, value)
    journal_params = {
      journalized_id: self.id, journalized_type: "Issue", user_id: self.author_id
    }
    journal = Journal.new journal_params
    if journal.save
      journal.journal_details.create(property: "attr", prop_key: prop_key, old_value: old_value, value: value)
    end
  end

  def get_journals_size
    journals.size
  end

  def self.issues_count(tracker_id)
    includes(:trakcer).where(tracker_id: tracker_id).size
  end

  def get_issue_tags
    if issue_tags.present?
      issue_tags.select(:id,:name,:color).uniq.as_json
    else
      nil
    end
  end

  def get_issue_tags_name
    if issue_tags.present?
      issue_tags.select(:name).uniq.pluck(:name).join(",")
    else
      nil
    end
  end

  def only_reply_journals
    journals.where.not(notes: [nil, ""]).journal_includes.limit(2)
  end

  def change_versions_count
    if self.version.present? && self.saved_change_to_status_id?
      if self.status_id == 5
        percent = self.version.issues_count == 0 ? 0.0 : ((self.version.closed_issues_count + 1).to_f / self.version.issues_count)
        self.version.update_attributes(closed_issues_count: (self.version.closed_issues_count + 1), percent: percent)
      elsif self.status_id_before_last_save == 5
        percent = self.version.issues_count == 0 ? 0.0 : ((self.version.closed_issues_count - 1).to_f / self.version.issues_count)
        self.version.update_attributes(closed_issues_count: (self.version.closed_issues_count - 1), percent: percent)
      end
    end
  end

end
