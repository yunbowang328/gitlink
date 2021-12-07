class Admins::PlatformCommunicatesController < Admins::BaseController 
  before_action :get_communicate, only: [:edit, :update, :destroy]
  def index
    sort_by = PlatformCommunicate.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
    sort_direction = %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
    q = PlatformCommunicate.ransack(title_cont: params[:search])
    communicates = q.result(distinct: true).order("#{sort_by} #{sort_direction}")
    @communicates = kaminari_paginate(communicates)
  end

  def new 
    @communicate = PlatformCommunicate.new
  end

  def create
    @communicate = PlatformCommunicate.new(communicate_params)
    if @communicate.save 
      redirect_to admins_platform_communicates_path 
      flash[:success] = '创建社区动态成功'
    else
      redirect_to admins_platform_communicates_path 
      flash[:danger] = "创建社区动态失败"
    end
  end

  def edit 

  end

  def update 
    @communicate.attributes = communicate_params
    if @communicate.save
      redirect_to admins_platform_communicates_path
      flash[:success] = '更新社区动态成功'
    else 
      redirect_to admins_platform_communicates_path
      flash[:danger] = '更新社区动态失败'
    end
  end

  def destroy 
    if @communicate.destroy 
      redirect_to admins_platform_communicates_path
      flash[:success] = '删除社区动态成功'
    else
      redirect_to admins_platform_communicates_path
      flash[:danger] = '删除社区动态失败'
    end
  end

  private 
  def get_communicate 
    @communicate = PlatformCommunicate.find_by_id(params[:id])
  end

  def communicate_params 
    params.require(:platform_communicate).permit!
  end
end