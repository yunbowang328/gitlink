class CompareController < ApplicationController
  # skip_before_action :require_login
  before_action :load_repository

  def index
  end

  def show
    load_compare_params
    compare
    @merge_status, @merge_message = get_merge_message
  end

  private
  def get_merge_message 
    if @base.blank? || @head.blank?
      return -2, "请选择分支"
    else
      if @head.include?(":")
        fork_project = @project.forked_projects.joins(:owner).where(users: {login: @head.to_s.split("/")[0]}).take
        return -2, "请选择正确的仓库" unless fork_project.present?
        @exist_pullrequest = @project.pull_requests.where(is_original: true, head: @head.to_s.split(":")[1], base: @base, status: 0, fork_project_id: fork_project.id).take
      else 
        @exist_pullrequest = @project.pull_requests.where(is_original: false, head: @base, base: @head, status: 0).take
      end
      if @exist_pullrequest.present?
        return -2, "在这些分支之间的合并请求已存在：<a href='/#{@owner.login}/#{@project.identifier}/pulls/#{@exist_pullrequest.id}'>#{@exist_pullrequest.try(:title)}</a>"
      else 
        if @compare_result["Commits"].blank? && @compare_result["Diff"].blank?
          return -2, "分支内容相同，无需创建合并请求"
        end
      end
    end
    return 0, "可以合并"
  end

  def compare

    # TODO: 处理fork的项目向源项目发送PR的base、head参数问题
    @compare_result ||=
      @head.include?(":") ? gitea_compare(@base, @head) : gitea_compare(@head, @base)
  end

  def load_compare_params
    @base = Addressable::URI.unescape(params[:base])
    @head = params[:head].include?('.json') ? params[:head][0..-6] : params[:head]
    @head = Addressable::URI.unescape(@head)
  end

  def gitea_compare(base, head)
    Gitea::Repository::Commits::CompareService.call(@owner.login, @project.identifier, CGI.escape(base), CGI.escape(head), current_user.gitea_token)
  end
end
