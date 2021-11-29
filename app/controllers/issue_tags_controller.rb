class IssueTagsController < ApplicationController
  before_action :require_login, except: [:index]
  before_action :load_repository
  before_action :set_user
  before_action :check_issue_tags_permission
  before_action :set_issue_tag, only: [:edit, :update, :destroy]


  def index
    issue_tags = @project.issue_tags.reorder("#{order_name} #{order_type}")
    @user_admin_or_member = current_user.present? && (current_user.admin || @project.member?(current_user))
    @page  = params[:page]  || 1
    @limit = params[:limit] || 15
    @issue_tags_size = issue_tags.size
    @issue_tags = issue_tags.page(@page).per(@limit)
  end


  def create
    title = params[:name].to_s.strip.first(10)
    desc = params[:description].to_s.first(30)
    color = params[:color] || "#ccc"

    tag_params = {
      name: title,
      description: desc,
      color: color
    }

    if title.present?
      if IssueTag.exists?(name: title, project_id: @project.id)
        normal_status(-1, "项目标记已存在")
      else
        ActiveRecord::Base.transaction do
          begin
            issue_tag = IssueTag.new(tag_params.merge(project_id: @project.id, user_id: current_user.id))
            if issue_tag.save
              # gitea_tag = Gitea::Labels::CreateService.new(current_user, @repository.try(:identifier), tag_params).call
              # if gitea_tag && issue_tag.update_attributes(gid: gitea_tag["id"], gitea_url: gitea_tag["url"])
              normal_status(0, "项目标记创建成功！")
              # else
              #   normal_status(-1, "项目标记创建失败")
              # end
            else
              normal_status(-1, "项目标记创建失败")
            end
          rescue => e
            puts "create version release error: #{e.message}"
            raise Error, e.message
          end
        end
      end
    else
      normal_status(-1, "项目标记名称不能为空")
    end
  end

  def edit

  end

  def update
    title = params[:name]
    desc = params[:description]
    color = params[:color] || "#ccc"

    tag_params = {
      name: title,
      description: desc,
      color: color
    }
    if title.present?
      if IssueTag.exists?(name: title, project_id: @project.id) && (@issue_tag.name != title)
        normal_status(-1, "项目标记已存在")
      else
        ActiveRecord::Base.transaction do
          begin
            if @issue_tag.update_attributes(tag_params)
              # gitea_tag = Gitea::Labels::UpdateService.new(current_user, @repository.try(:identifier),@issue_tag.try(:gid), tag_params).call
              # if gitea_tag
              #   normal_status(0, "项目标记更新成功")
              # else
              #   normal_status(-1, "项目标记更新失败")
              # end
            else
              normal_status(-1, "项目标记更新失败")
            end
          rescue => e
            puts "create version release error: #{e.message}"
            raise Error, e.message
          end
        end
      end
    else
      normal_status(-1, "项目标记名称不能为空")
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      begin
        if @issue_tag.destroy
          # issue_tag = Gitea::Labels::DeleteService.new(@user, @repository.try(:identifier), @issue_tag.try(:gid)).call
          # if issue_tag
          #   normal_status(0, "项目标记删除成功")
          # else
          #   normal_status(-1, "项目标记删除失败")
          # end
        else
          normal_status(-1, "项目标记删除失败")
        end
      rescue => e
        puts "create version release error: #{e.message}"
        raise Error, e.message
      end
    end
  end

  private

  def set_user
    @user = @project.owner
  end

  def check_issue_tags_permission
    unless @project.manager?(current_user) || current_user.admin?
      return render_forbidden('你不是管理员，没有权限操作')
    end
  end

  def set_issue_tag
    @issue_tag = IssueTag.find_by_id(params[:id])
    unless @issue_tag.present?
      normal_status(-1, "项目标记不存在")
    end
  end

  private 

  def order_name
    IssueTag.column_names.include?(params[:order_name]) ? params[:order_name] : 'created_at'
  end

  def order_type 
    %w(desc asc).include?(params[:order_type]) ? params[:order_type] : 'desc'
  end

end
