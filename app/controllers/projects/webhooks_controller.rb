class Projects::WebhooksController < Projects::BaseController
  before_action :require_manager!
  before_action :find_webhook, only:[:edit, :update, :destroy, :tasks, :test]

  def index 
    @webhooks = @project.webhooks
    @webhooks = kaminari_paginate(@webhooks)
  end

  def create 
    ActiveRecord::Base.transaction do
      return render_error("webhooks数量已到上限！请删除暂不使用的webhooks以进行添加操作") if @project.webhooks.size > 19
      return render_error("参数错误.") unless webhook_params.present?
      form =  Projects::Webhooks::CreateForm.new(webhook_params)
      return  render json: {status: -1, message: form.errors} unless form.validate!
      response = Gitea::Repository::Webhooks::CreateService.new(current_user.gitea_token, @project&.owner&.login, @project&.identifier, gitea_webhooks_params).call
      if response[0] == 201 
        @webhook = response[2]
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
    return render_error("参数错误.") unless webhook_params.present?
    form =  Projects::Webhooks::CreateForm.new(webhook_params)
    return  render json: {status: -1, message: form.errors} unless form.validate!
    response = Gitea::Repository::Webhooks::UpdateService.call(current_user.gitea_token, @project&.owner&.login, @project&.identifier, @webhook.id, gitea_webhooks_params)
    if response[0] == 200
      @webhook = response[2]
      render_ok
    else 
      render_error("更新失败.")
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy 
    response = Gitea::Repository::Webhooks::DeleteService.call(current_user.gitea_token, @project&.owner&.login, @project&.identifier, @webhook.id)
    if response[0] == 204
      @webhook = response[2]
      render_ok
    else 
      render_error("删除失败.")
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def tasks
    @tasks = @webhook.tasks.order("delivered desc")
    @tasks = kaminari_paginate(@tasks)
  end

  def test 
    ActiveRecord::Base.transaction do
      response = Gitea::Repository::Webhooks::TestService.call(current_user.gitea_token, @project&.owner&.login, @project&.identifier, @webhook.id)
      if response[0] == 204
        render_ok
      else 
        render_error("测试推送失败.")
      end
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def find_webhook
    @webhook = Gitea::Webhook.find_by_id(params[:id])
    return render_not_found if @webhook.nil?
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
        secret: webhook_params[:secret]
      },
      events: webhook_params[:events],
      type: webhook_type,
    }
  end
end