# encoding=utf-8
class CategoriesController < ApplicationController
  before_action :require_login, :except => [:all]
  skip_before_action :session_expiration, :only => [:all]
  include ApplicationHelper

  # 所有类型，通过参数过滤
  def all
    render_react
  end

  def guide
    render_react
  end

  def techShare
    render_react
  end

  def show
    render_react
  end

  def shixun_discuss
    render_react
  end

  # 我的发布
  def my_published

  end

  private
  def render_react
    render "/common/index", :layout => false
  end
end
