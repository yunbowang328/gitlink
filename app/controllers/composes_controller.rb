class ComposesController < ApplicationController
  before_action :require_login, except: [:index]
  before_action :find_compose, except: [:index, :new,:create]

  def index
    @order_type = params[:order] || "created_at"
    @search_name = params[:search]
    composes = Compose.compose_includes
    if @search_name.present?
      composes = composes.where("title like ?", "%#{@search_name}%")
    end
    composes = composes.order("#{@order_type} desc")
    @page  = params[:page]  || 1
    @limit = params[:limit] || 15
    @composes_size = composes.size
    @composes = composes.page(@page).per(@limit)
  end

  def new

  end

  def create
    ActiveRecord::Base.transaction do
      begin
        @compose = Compose.new(compose_params.merge(user_id: current_user.id))
        if @compose.save
          ComposeUser.create!(user_id: current_user.id, compose_id: @compose.id, is_manager: 1)
          normal_status(0,"组织创建成功")
        else
          error_messages = @compose.errors.messages[:title][0]
          normal_status(-1,"组织创建失败:#{error_messages}")
        end
      rescue Exception => e
        tip_exception("#{e}")
        raise ActiveRecord::Rollback
      end
    end
  end

  def edit

  end

  def update
    if @compose.update_attributes(compose_params)
      normal_status(0,"组织更新成功")
    else
      error_messages = @compose.errors.messages[:title][0]
      normal_status(-1,"组织更新失败:#{error_messages}")
    end
  end

  def destroy
    if @compose.destroy
      normal_status(0,"组织删除成功")
    else
      normal_status(-1,"组织删除失败，请稍后重试")
    end
  end

  def show
    compose_projects_ids = @compose&.compose_projects&.pluck(:project_id)
    search = params[:search]
    if compose_projects_ids.size > 0
      compose_projects = Project.where(id: compose_projects_ids)

      if search.present?
        compose_projects = compose_projects.where("name like ? ", "%#{search.to_s.strip}%")
      end
    else
      compose_projects = []
    end

    @compose_projects_size = compose_projects.size

    if @compose_projects_size > 0
      @page  = params[:page]  || 1
      @limit = params[:limit] || 15
      @compose_projects = compose_projects.page(@page).per(@limit)
    else
      @compose_projects = compose_projects
    end
  end

  private

  def compose_params
    params.require(:compose).permit(:user_id, :title, :description, :show_mode, :compose_mode, :compose_users_count, :compose_projects_count)
  end

  def find_compose
    @compose = Compose.find(params[:compose_id])
    unless @compose.present?
      normal_status(-1, "组织不存在")
    end
  end

end