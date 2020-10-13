class MyMemosController < ApplicationController 

  def index 
    targets = MyMemosService.new.index params, current_user
    render json: targets
  end

  def my_interested
    targets = MyMemosService.new.my_interested params, current_user
    render json: targets
  end

  def replies_memos
    targets = MyMemosService.new.replies_memos params,current_user
    render json: targets
  end

  def recommend_memos
    targets = MyMemosService.new.recommend_memos current_user
    render json: targets
  end
end