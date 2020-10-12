class PlatesController < ApplicationController
  def index
    render_react
  end

  def show
    render_react
  end

  def all
    render_react
  end

  def is_fine
    render_react
  end

  def my_memos
    render_react
  end

  def my_topics
    render_react
  end

  private
  def render_react
    render "/common/index", :layout => false
  end
end
