class Projects::WebhooksController < Projects::BaseController
  before_action :require_manager!

  def index 
    @webhooks = @project.webhooks
    @webhooks = kaminari_paginate(@webhooks)
  end

  def create 
    ActiveRecord::Base.transaction do
      return render_error("参数错误.") unless webhook_params.present?
      form =  Projects::Webhooks::CreateForm.new(webhook_params)
      return  render json: {status: -1, message: form.errors} unless form.validate!
      response = Gitea::Repository::Webhooks::CreateService.new(current_user.gitea_token, @project&.owner&.login, @project&.identifier, gitea_webhooks_params).call
      if response[0] == 201 
        @webhook = response[2]
        puts @webhook
      else 
        render_error("创建失败.")
      end
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def edit 
  end

  def update 
  end

  def destroy 
  end

  private 
  def find_webhook
    @webhook = Gitea::Webhook.find_by_id(params[:id])
  end

  def webhook_params 
    params.require(:webhook).permit(:url, :type, :http_method, :content_type, :secret, :active, :branch_filter, events: [])
  end

  def webhook_type
    webhook_params.fetch(:type, "gitea")
  end

  def webhook_branch_filter 
    webhook_params.fetch(:branch_filter, "*")
  end

  def gitea_webhooks_params
    {
      active: webhook_params[:active],
      branch_filter: webhook_branch_filter,
      config: {
        content_type: webhook_params[:content_type],
        url: webhook_params[:url],
        http_method: webhook_params[:http_method],
      },
      events: webhook_params[:events],
      type: webhook_type,
    }
  end
end