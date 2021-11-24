# == Schema Information
#
# Table name: issues
#
#  id                   :integer          not null, primary key
#  tracker_id           :integer          not null
#  project_id           :integer          not null
#  subject              :string(255)      default(""), not null
#  description          :text(4294967295)
#  due_date             :date
#  category_id          :integer
#  status_id            :integer          not null
#  assigned_to_id       :integer
#  priority_id          :integer          not null
#  fixed_version_id     :integer
#  author_id            :integer          not null
#  created_on           :datetime
#  updated_on           :datetime
#  start_date           :date
#  done_ratio           :integer          default("0"), not null
#  estimated_hours      :float(24)
#  parent_id            :integer
#  root_id              :integer
#  lft                  :integer
#  rgt                  :integer
#  is_private           :boolean          default("0"), not null
#  closed_on            :datetime
#  project_issues_index :integer
#  issue_type           :string(255)
#  token                :integer          default("0")
#  issue_tags_value     :string(255)
#  is_lock              :boolean          default("0")
#  issue_classify       :string(255)
#  ref_name             :string(255)
#  branch_name          :string(255)
#
# Indexes
#
#  index_issues_on_assigned_to_id           (assigned_to_id)
#  index_issues_on_author_id                (author_id)
#  index_issues_on_category_id              (category_id)
#  index_issues_on_created_on               (created_on)
#  index_issues_on_fixed_version_id         (fixed_version_id)
#  index_issues_on_priority_id              (priority_id)
#  index_issues_on_root_id_and_lft_and_rgt  (root_id,lft,rgt)
#  index_issues_on_status_id                (status_id)
#  index_issues_on_tracker_id               (tracker_id)
#  issues_project_id                        (project_id)
#

class Issue < ApplicationRecord
  #issue_type 1为普通，2为悬赏
  belongs_to :project, counter_cache: true, touch: true
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
  # has_many :memos
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
  scope :issue_index_includes, ->{includes(:tracker, :priority, :version, :issue_status, :journals,:issue_tags,user: :user_extension)}
  scope :closed, ->{where(status_id: 5)}
  after_create :incre_project_common, :incre_user_statistic, :incre_platform_statistic
  after_update :change_versions_count
  after_destroy :update_closed_issues_count_in_project!, :decre_project_common, :decre_user_statistic, :decre_platform_statistic

  def incre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {issues: 1}, self.project_id)
  end

  def decre_project_common
    CacheAsyncSetJob.perform_later("project_common_service", {issues: -1}, self.project_id)
  end

  def incre_user_statistic 
    CacheAsyncSetJob.perform_later("user_statistic_service", {issue_count: 1}, self.author_id)
  end

  def decre_user_statistic
    CacheAsyncSetJob.perform_later("user_statistic_service", {issue_count: -1}, self.author_id)
  end

  def incre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {issue_count: 1})
  end

  def decre_platform_statistic
    CacheAsyncSetJob.perform_later("platform_statistic_service", {issue_count: -1})
  end

  def get_assign_user
    User&.find_by_id(self.assigned_to_id) if self.assigned_to_id.present?
  end

  def create_journal_detail(change_files, issue_files, issue_file_ids, user_id)
    journal_params = {
      journalized_id: self.id, journalized_type: "Issue", user_id: user_id
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

  def custom_journal_detail(prop_key, old_value, value, user_id)
    journal_params = {
      journalized_id: self.id, journalized_type: "Issue", user_id: user_id
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

  def is_collaborators?
    self.assigned_to_id.present? ? self.project.members.where(user_id: self.assigned_to_id).present? : false
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

  def update_closed_issues_count_in_project!
    self.project.decrement!(:closed_issues_count)
  end

end
