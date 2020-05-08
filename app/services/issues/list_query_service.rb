class Issues::ListQueryService < ApplicationService

  attr_reader :all_issues, :params

  def initialize(all_issues, params)
    @all_issues = all_issues
    @params = params
  end

  def call
    status_type = params[:status_type].to_s  #issue状态的选择
    search_name = params[:search].to_s
    start_time = params[:start_date]
    end_time = params[:due_date]

    if status_type.to_s == "1"  #表示开启中的
      issues = all_issues.where.not(status_id: 5)
    elsif status_type.to_s == "2"   #表示关闭中的
      issues = all_issues.where(status_id: 5)
    else 
      issues = all_issues
    end

    if search_name.present?
      issues = issues.where("subject like ?", "%#{search_name}%")
    end

    if start_time&.present? || end_time&.present?
      issues = issues.where("start_date between ? and ?",start_time&.present? ? start_time.to_date : Time.now.to_date, end_time&.present? ? end_time.to_date : Time.now.to_date)
    end

    issues = issues.where(author_id: params[:author_id]) if params[:author_id].present? && params[:author_id].to_s != "all"
    issues = issues.where(assigned_to_id: params[:assigned_to_id]) if params[:assigned_to_id].present? && params[:assigned_to_id].to_s != "all"
    issues = issues.where(tracker_id: params[:tracker_id]) if params[:tracker_id].present? && params[:tracker_id].to_s != "all"
    issues = issues.where(status_id: params[:status_id]) if params[:status_id].present? && params[:status_id].to_s != "all"
    issues = issues.where(priority_id: params[:priority_id]) if params[:priority_id].present? && params[:priority_id].to_s != "all"
    issues = issues.where(fixed_version_id: params[:fixed_version_id]) if params[:fixed_version_id].present? && params[:fixed_version_id].to_s != "all"
    issues = issues.where(done_ratio: params[:done_ratio].to_i) if params[:done_ratio].present? && params[:done_ratio].to_s != "all"
    issues = issues.where(issue_type: params[:issue_type].to_s) if params[:issue_type].present? && params[:issue_type].to_s != "all"
    issues = issues.joins(:issue_tags).where(issue_tags: {id: params[:issue_tag_id].to_i}) if params[:issue_tag_id].present? && params[:issue_tag_id].to_s != "all"

    order_type = params[:order_type] || "desc"   #或者"asc"
    order_name = params[:order_name] || "created_on"   #或者"updated_on"
    issues.reorder("#{order_name} #{order_type}")

  end

end