class HooksController < ApplicationController
  before_action :require_login
  before_action :find_project_with_id
  before_action :check_user
  before_action :set_repository

  def index
    hooks_response = Gitea::Hooks::ListService.new(@user.gitea_token, @user.login, @repository.try(:identifier)).call
    if hooks_response.status == 200
      lists = JSON.parse(hooks_response.body)
      @hooks_size = lists.size
      @hooks = paginate(lists)
    else
      normal_status(-1, "出现错误")
    end
  end

  def create
    #根据gitea的api
    # hook_params = {
    #   active: true,
    #   type: "gitea",
    #   branch_filter: "",
    #   config: {
    #     content_type: "application/json",
    #     url: "#{EduSetting.get("host_name")}/repositories/#{project.id}/repo_hooks.json",
    #     http_method: "post"
    #   },
    #   events: ["create", "pull", "push"],
    # }
    #根据gitea上hook的字段测试的
    # hook_params = {
    #   is_active: params[:is_active] || false,
    #   type: params[:type],
    #   http_method: params[:http_method] || "POST",
    #   content_type: params[:content_type].to_i,
    #   secret: params[:secret],
    #   events: {
    #     push_only: params[:push_only] || false, # 是否为推送事件
    #     send_everything: params[:send_everything] || false, #是否为所有事件
    #     choose_events: params[:choose_events] || false, #是否为自定义事件
    #     branch_filter: params[:branch_filter] || "*",
    #     events: {
    #       create: params[:create] || false,  #创建分支/标签
    #       delete: params[:delete] || false, #删除分支/标签
    #       fork: params[:fork] || false, #仓库被派生
    #       issues: params[:issues] || false, #工单
    #       issue_comment: params[:issue_comment] || false, #评论
    #       push: params[:push] || false # 推送
    #       pull_request: params[:pull_request] || false #合并请求
    #       repository: params[:repository] || false #仓库
    #       release: params[:release] || false #版本发布
    #     }
    #   }
    # }

    hook_params = params[:hook_params]
    Gitea::Hooks::CreateService.new(@user, @repository.try(:identifier), hook_params).call  #创建gitea的hook功能
    Gitea::Hooks::CreateService.new(user, p.try(:identifier), hook_params).call  #创建gitea的hook功能

  end

  def update
    hook_params = params[:hook_params]
    response = Gitea::Hooks::UpdateService.new(@user, @repository.try(:identifier), hook_params, params[:id]).call
    if response.status == 200
      normal_status(1, "更新成功")
    else
      normal_status(-1, "更新失败")
    end
  end

  def destroy
    response = Gitea::Hooks::DestroyService.new(@user, @repository.try(:identifier), params[:id]).call
    if response.status == 204
      normal_status(1, "删除成功")
    else
      normal_status(-1, "删除失败")
    end
  end

  private

  def set_repository
    @repository = @project.repository
    @user = @project.owner
    normal_status(-1, "仓库不存在") unless @repository.present?
    normal_status(-1, "用户不存在") unless @user.present?
  end

  def check_user
    unless @project.user_id == current_user.id
      tip_exception(403, "您没有权限进入")
    end
  end
end
