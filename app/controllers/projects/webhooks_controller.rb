class Projects::WebhooksController < Projects::BaseController

  def index 
    @webhooks = @project.webhooks
    @webhooks = kaminari_paginate(@webhooks)
  end

  def create 
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
end