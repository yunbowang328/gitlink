class VersionsController < ApplicationController
  before_action :require_login, except: [:index, :show]
  before_action :load_repository
  before_action :check_issue_permission, except: [:show, :index]
  before_action :set_version, only: [:edit, :update, :destroy, :show,:update_status]

  def index
    @user_admin_or_member = current_user.present? && (current_user.admin || @project.member?(current_user))
    order_name = params[:order_name] || "created_on"
    order_type = params[:order_type] || "desc"
    status = params[:status]
    versions = @project.versions.version_includes
    @open_versions_size = versions.where(status: "open")&.size
    @closed_versions_size = versions.where(status: "closed")&.size

    if status.present?
      versions = versions.where(status: status.to_s.strip)
    end

    versions = versions.reorder("#{order_name} #{order_type}")

    @page  = params[:page]  || 1
    @limit = params[:limit] || 15
    @versions_size = versions.size
    @versions = versions.page(@page).per(@limit)
  end

  def show
    order_name = params[:order_name] || "created_on"
    order_type = params[:order_type] || "desc"

    version_issues = @version.issues.issue_includes

    status_type = params[:status_type] || "1"
    # @close_issues_size = version_issues.where(status_id: 5).size
    # @open_issues_size = version_issues.size - @close_issues_size

    if status_type.to_s == "1"  #表示开启中的
      version_issues = version_issues.where.not(status_id: 5)
    else
      version_issues = version_issues.where(status_id: 5)
    end
    version_issues = version_issues.where(author_id: params[:author_id]) if params[:author_id].present? && params[:author_id].to_s != "all"
    version_issues = version_issues.where(assigned_to_id: params[:assigned_to_id]) if params[:assigned_to_id].present? && params[:assigned_to_id].to_s != "all"
    version_issues = version_issues.where(tracker_id: params[:tracker_id]) if params[:tracker_id].present? && params[:tracker_id].to_s != "all"
    version_issues = version_issues.where(status_id: params[:status_id]) if params[:status_id].present? && params[:status_id].to_s != "all"
    version_issues = version_issues.where(priority_id: params[:priority_id]) if params[:priority_id].present? && params[:priority_id].to_s != "all"
    version_issues = version_issues.where(fixed_version_id: params[:fixed_version_id]) if params[:fixed_version_id].present? && params[:fixed_version_id].to_s != "all"
    version_issues = version_issues.where(done_ratio: params[:done_ratio].to_i) if params[:done_ratio].present? && params[:done_ratio].to_s != "all"
    version_issues = version_issues.where(issue_type: params[:issue_type].to_s) if params[:issue_type].present? && params[:issue_type].to_s != "all"
    version_issues = version_issues.joins(:issue_tags).where(issue_tags: {id: params[:issue_tag_id].to_i}) if params[:issue_tag_id].present? && params[:issue_tag_id].to_s != "all"

    version_issues = version_issues.reorder("#{order_name} #{order_type}")

    @page  = params[:page]  || 1
    @limit = params[:limit] || 15
    @version_issues_size = version_issues.size
    @version_issues = version_issues.page(@page).per(@limit)
  end

  def create
    name = params[:name].to_s.strip
    desc = params[:description]
    effective_date = params[:effective_date]
    status = params[:status] || "open"
    sharing = params[:sharing] || ""
    wiki_page_title = params[:wiki_page_title] || ""

    tag_params = {
      name: name,
      description: desc,
      effective_date: effective_date,
      status: status,
      sharing: sharing,
      wiki_page_title: wiki_page_title
    }

    if name.present?
      if Version.exists?(name: name, project_id: @project.id)
        normal_status(-1, "里程碑已存在")
      else
        version = Version.new(tag_params.merge(project_id: @project.id, user_id: current_user.id))
        if version.save
          normal_status(0, "里程碑创建成功")
        else
          normal_status(-1, version.errors.messages.values[0][0])
        end
      end

    else
      normal_status(-1, "里程碑名称不能为空")
    end

  end

  def edit

  end

  def update
    name = params[:name].to_s.strip
    desc = params[:description]
    effective_date = params[:effective_date]
    status = params[:status] || "open"
    sharing = params[:sharing] || ""
    wiki_page_title = params[:wiki_page_title] || ""

    tag_params = {
      name: name,
      description: desc,
      effective_date: effective_date,
      status: status,
      sharing: sharing,
      wiki_page_title: wiki_page_title
    }

    if name.present?
      if Version.exists?(name: name, project_id: @project.id)  && (@version.name != name)
        normal_status(-1, "里程碑已存在")
      else
        if @version.update_attributes(tag_params)
          normal_status(0, "里程碑更新成功")
        else
          normal_status(-1, version.errors.messages.values[0][0])
        end
      end
    else
      normal_status(-1, "里程碑名称不能为空")
    end
  end

  def destroy
    if @version.destroy
      normal_status(0, "里程碑删除成功")
    else
      normal_status(-1, "里程碑删除失败")
    end
  end

  def update_status
    status = params[:status] || "open"
    all_status = %w(open closed locked)
    if all_status.include?(status)
      if @version.update_attribute(:status, status)
        normal_status(0, "操作成功")
      else
        normal_status(-1, "操作失败")
      end
    else
      normal_status(-1, "status状态值错误")
    end
  end

  private

  def check_issue_permission
    unless @project.member?(current_user) || current_user.admin?
      normal_status(-1, "您没有权限")
    end
  end

  def set_version
    @version = Version.find_by_id(params[:id])
    unless @version.present?
      normal_status(-1, "里程碑不存在")
    end
  end

end
