class TopicsController < ApplicationController

  def index 
    return render_not_found("请输入正确的数据类型") unless params[:topic_type].present?
    scope = Topic.with_single_type(params[:topic_type])
    @topics = kaminari_paginate(scope)
  end

end