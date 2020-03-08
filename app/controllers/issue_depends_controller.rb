class IssueDependsController < ApplicationController
  before_action :require_login
  before_action :set_issue
  before_action :check_issue_permission

  def create
    issue_depend = {
      user_id: current_user.id,
      depend_issue_id: params[:depend_issue_id].to_i,
      issue_id: @issue.id
    }
    save_issue_depend = IssueDepend.new(issue_depend)
    if save_issue_depend.save
      @issue.custom_journal_detail("issue_depend","", @issue.id)
      normal_status(0, "添加依赖成功")
    else
      normal_status(0, "添加依赖失败")
    end
  end


  def destroy
    depend_issue_params = params[:id]
    depend_issue = IssueDepend.find(depend_issue_params)
    if depend_issue&.destroy
      @issue.custom_journal_detail("destroy_issue_depend","", @issue.id)
      normal_status(0, "删除依赖成功")
    else
      normal_status(-1, "删除依赖失败")
    end
  end

  private
  def set_issue
    @issue = Issue.find_by_id(params[:issue_id])
    unless @issue.present?
      normal_status(-1, "标签不存在")
    end
  end

  def check_issue_permission
    @project = @issue.project
    unless @project.member?(current_user) || current_user.admin?
      normal_status(-1, "您没有权限")
    end
  end
end
