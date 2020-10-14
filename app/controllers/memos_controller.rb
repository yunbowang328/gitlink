class MemosController < ApplicationController
  before_action :require_login, only: [:create, :edit, :update, :watch_memo]

  def index 
    memos = MemosService.new.index params, current_user
    render json: memos
  end

  def related_memos
    targets = MemosService.new.related_memos params, current_user
    render json: targets
  end

  def edit 
    targets = MemosService.new.edit params, current_user
    render json: targets
  end

  def update 
    targets = MemosService.new.update params, current_user
    render json: targets
  end

  def create 
    params.permit!
    targets = MemosService.new.create params, current_user
    render json: targets
  end

  def show 
    targets = MemosService.new.show params, current_user
    render json: targets
  end

  def watch_memo
    targets = MemosService.new.watch_memo params, current_user
    render json: targets
  end

  def hidden 
    Memo.find(params[:id]).update_attribute(:hidden, true)
    {status: 0, message: "隐藏成功"}
  end

  def memo_hidden
    targets = MemosService.new.memo_hidden params, current_user
    render json: targets
  end

  def reply
    targets = MemosService.new.reply params, current_user
    render json: targets
  end

  def destroy
    targets = MemosService.new.destroy params, current_user
    render json: targets
  end

  def set_top_or_down
    targets = MemosService.new.set_top_or_down params, current_user
    render json: targets
  end

  def is_fine
    targets = MemosService.new.is_fine params, current_user
    render json: targets
  end

  def banned_user
    targets = MemosService.new.banned_user params, current_user
    render json: targets
  end

  def more_reply
    targets = MemosService.new.more_reply params, current_user
    render json: targets
  end

  def forum_memos
    targets = MemosService.new.forum_memos params, current_user
    render json: targets
  end

  def forum_memos_head
    targets = MemosService.new.forum_memos_head params, current_user
    render json: targets
  end

  def forum_memos_right
    targets = MemosService.new.forum_memos_right params, current_user
    render json: targets
  end

  def is_watch
    targets =  MemosService.new.is_watch params, current_user
    render json: targets
  end

  def confirm_delete
    targets = MemosService.new.confirm_delete params, current_user
    render json: targets
  end

  def plus
    targets = MemosService.new.plus params, current_user
    render json: targets
  end
end