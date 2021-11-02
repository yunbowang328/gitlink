class Admins::Topic::CooperatorsController < Admins::Topic::BaseController
  before_action :find_cooperator, only: [:edit, :update, :destroy]

  def index 
    @cooperators = kaminari_paginate(::Topic::Cooperator)
  end

  def new 
    @cooperator = ::Topic::Cooperator.new
  end

  def create 
    @cooperator = ::Topic::Cooperator.new(cooperator_params)
    if @cooperator.save 
      save_image_file(params[:image], @cooperator)
      redirect_to admins_topic_cooperators_path
      flash[:success] = "新增合作单位成功"
    else
      redirect_to admins_topic_cooperators_path
      flash[:danger] = "新增合作单位失败"
    end
  end

  def edit 
  end

  def update 
    @cooperator.attributes = cooperator_params
    if @cooperator.save 
      save_image_file(params[:image], @cooperator)
      redirect_to admins_topic_cooperators_path
      flash[:success] = "更新合作单位成功"
    else  
      redirect_to admins_topic_cooperators_path
      flash[:danger] = "更新合作单位失败"
    end
  end

  def destroy 
    if @cooperator.destroy 
      redirect_to admins_topic_cooperators_path
      flash[:success] = "删除合作单位成功"
    else  
      redirect_to admins_topic_cooperators_path
      flash[:danger] = "删除合作单位失败"
    end
  end

  private 
  def find_cooperator
    @cooperator = ::Topic::Cooperator.find_by_id(params[:id])
  end

  def cooperator_params 
    params.require(:topic_cooperator).permit(:title, :url, :order_index)
  end
end