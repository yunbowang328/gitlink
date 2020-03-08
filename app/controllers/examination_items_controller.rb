class ExaminationItemsController < ApplicationController
  before_action :require_login
  before_action :certi_identity_auth, only: [:create, :destroy, :delete_item_type, :set_score, :batch_set_score, :adjust_position]
  before_action :validate_score, only: [:set_score, :batch_set_score]
  before_action :find_exam, only: [:create, :batch_set_score, :delete_item_type]
  before_action :find_item, except: [:create, :batch_set_score, :delete_item_type]
  before_action :edit_auth

  def create
    ExaminationItems::SaveItemService.call(current_user, create_params, @exam)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def destroy
    ActiveRecord::Base.transaction do
      @exam.examination_items.where(item_type: @item.item_type).where("position > #{@item.position}").update_all("position = position -1")
      @item.destroy!
    end
    render_ok
  end

  def delete_item_type
    items = @exam.examination_items.where(item_type: params[:item_type])
    items.destroy_all
    render_ok
  end

  def set_score
    @item.update_attributes!(score: params[:score])
    @questions_score = @exam.examination_items.where(item_type: @item.item_type).pluck(:score).sum
    @all_score = @exam.examination_items.pluck(:score).sum
    render_ok({questions_score: @questions_score, all_score: @all_score})
  end

  def batch_set_score
    @exam.examination_items.where(item_type: params[:item_type]).update_all(score: params[:score])
    @questions_score = @exam.examination_items.where(item_type: params[:item_type]).pluck(:score).sum
    @all_score = @exam.examination_items.pluck(:score).sum
    render_ok({questions_score: @questions_score, all_score: @all_score})
  end

  def adjust_position
    same_items = @exam.examination_items.where(item_type: @item.item_type)
    max_position = same_items.size
    tip_exception("position超出范围") unless params[:position].present? && params[:position].to_i <= max_position && params[:position].to_i >= 1
    ActiveRecord::Base.transaction do
      if params[:position].to_i > @item.position
        same_items.where("position > #{@item.position} and position <= #{params[:position].to_i}").update_all("position=position-1")
        @item.update_attributes!(position: params[:position])
      elsif params[:position].to_i < @item.position
        same_items.where("position < #{@item.position} and position >= #{params[:position].to_i}").update_all("position=position+1")
        @item.update_attributes!(position: params[:position])
      else
        return normal_status(-1, "排序无变化")
      end
    end
    render_ok
  end

  private

  def find_exam
    @exam = ExaminationBank.find_by!(id: params[:exam_id])
  end

  def create_params
    params.permit(item_ids: [])
  end

  def find_item
    @item = ExaminationItem.find_by!(id: params[:id])
    @exam = @item.examination_bank
  end

  def validate_score
    tip_exception("分值不能为空") unless params[:score].present?
    tip_exception("分值需大于0") unless params[:score].to_f > 0
  end

  def edit_auth
    current_user.admin_or_business? || @exam.user == current_user
  end
end