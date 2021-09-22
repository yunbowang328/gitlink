class Admins::MessageTemplatesController < Admins::BaseController 
  before_action :get_template, only: [:edit,:update, :destroy]

  def index 
    message_templates = MessageTemplate.group(:type).count.keys
    @message_templates = kaminari_array_paginate(message_templates)
  end

  def edit 
  end

  def update 
    if @message_template.update_attributes(message_template_params)
      redirect_to admins_message_templates_path
      flash[:success] = '消息模版更新成功'
    else 
      redirect_to admins_message_templates_path
      flash[:danger] = @message_template.errors.full_messages.join(",")
    end
  end

  def init_data
    if MessageTemplate.build_init_data
      redirect_to admins_message_templates_path
      flash[:success] = '消息模版初始化成功'
    else 
      redirect_to admins_message_templates_path
      flash[:danger] = '消息模版初始化失败'
    end
  end

  private 
  def message_template_params 
    params.require(:message_template).permit!
  end

  def get_template
    @message_template = MessageTemplate.find_by(id: params[:id])
    unless @message_template.present?
      redirect_to admins_message_templates_path 
      flash[:danger] = "消息模版不存在"
    end
  end
end