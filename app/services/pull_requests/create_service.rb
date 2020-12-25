class PullRequests::CreateService < ApplicationService

  attr_reader :current_user, :owner, :project, :params

  def initialize(current_user, owner, project, params)
    @owner        = owner
    @project      = project
    @params       = params
    @current_user = current_user
  end

  def call
    validate!
    save_pull_issue!
    save_pull_request!
    save_issue_tags_relates!
    save_tiding!
    save_project_trend!
    save_custom_journal_detail!

    [pull_request, gitea_pull_request]
  end

  def pull_issue_params
    {
      user: @current_user,
      project: @project,
      subject: @params[:title],
      description: @params[:body],
      assigned_to_id: @params[:assigned_to_id],
      fixed_version_id: @params[:fixed_version_id],
      issue_tags_value: @params[:issue_tag_ids].present? ? @params[:issue_tag_ids].join(",") : "",
      priority_id: @params[:priority_id] || "2",
      issue_classify: "pull_request",
      issue_type: @params[:issue_type] || "1",
      tracker_id: 2,
      status_id: 1,
    }
  end

  def pull_issue
    @pull_issue ||= Issue.new(pull_issue_params.compact)
  end

  def save_pull_issue!
    pull_issue.save
  end

  def pull_request
    @pull_request ||= @project.pull_requests.new(pull_request_params.compact)
  end

  def save_pull_request!
    pull_request.save
  end

  def save_issue_tags_relates!
    issue_tag_ids.each do |tag|
      IssueTagsRelate.create!(issue_id: pull_issue.id, issue_tag_id: tag)
    end
  end

  def issue_tag_ids
    Array(@params[:issue_tag_ids])
  end

  def save_tiding!
    if @params[:assigned_to_id].present?
      Tiding.create!(user_id: @params[:assigned_to_id],
        trigger_user: @current_user,
        container: pull_request,
        parent_container: @project,
        tiding_type: 'pull_request',
        status: 0)
    end
  end

  def save_project_trend!
    project_trend.save
  end

  def project_trend
    @project_trend ||= pull_request.project_trends.new(
      user: @current_user,
      project: @project,
      action_type: "create")
  end

  def pull_request_params
    base_pull_params.merge({
      user: @current_user,
      issue: pull_issue,
      fork_project_id: @params[:fork_project_id],
      is_original: @params[:is_original],
      files_count: @params[:files_count] || 0,
      commits_count: @params[:commits_count] || 0
    })
  end

  def save_custom_journal_detail!
    if @params[:title].to_s.include?("WIP:")
      pull_issue.custom_journal_detail("WIP", "", "这个合并请求被标记为尚未完成的工作。完成后请从标题中移除WIP:前缀。", @current_user&.id)
    end
  end

  def gitea_pull_request
    @gitea_pull_request ||= create_gitea_pull_request!
  end

  def create_gitea_pull_request!
    @gitea_pull_request =
      Gitea::PullRequest::CreateService.call(
        @current_user&.gitea_token,
        @owner.login,
        @project&.identifier,
        gitea_pull_request_params.compact)
  end

  def gitea_pull_request_params
    merge_original_pull_params.except(:milestone)
  end

  def merge_original_pull_params
    if pull_request.is_original && @params[:merge_user_login]
      base_pull_params.merge(head: "#{@params[:merge_user_login]}:#{@params[:head]}")
    else
      base_pull_params
    end
  end

  def base_pull_params
    {
      title: @params[:title],  #标题
      body:	@params[:body],  #内容
      head: @params[:head],  #源分支
      base: @params[:base],  #目标分支
      milestone: 0,  #里程碑,未与本地的里程碑关联
    }
  end

  def validate!
    raise "title参数不能为空" if @params[:title].blank?
    raise "head参数不能为空" if @params[:head].blank?
    raise "base参数不能为空" if @params[:base].blank?
  end
end
