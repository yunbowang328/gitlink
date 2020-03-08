class ItemBasketsController < ApplicationController
  before_action :require_login
  before_action :certi_identity_auth, only: [:create, :delete_item_type, :destroy, :set_score, :batch_set_score, :adjust_position]
  before_action :validate_score, only: [:set_score, :batch_set_score]
  helper_method :current_basket

  def index
    @item_baskets = basket_items
    @single_questions = @item_baskets.where(item_type: "SINGLE")
    @multiple_questions = @item_baskets.where(item_type: "MULTIPLE")
    @judgement_questions = @item_baskets.where(item_type: "JUDGMENT")
    @program_questions = @item_baskets.where(item_type: "PROGRAM")
  end

  def basket_list
    @basket_count = current_user.item_baskets.group(:item_type).count
  end

  def create
    ItemBaskets::SaveItemBasketService.call(current_user, create_params, exam_setting)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def destroy
    item = basket_items.find_by!(item_bank_id: params[:id])
    ActiveRecord::Base.transaction do
      basket_items.where(item_type: item.item_type).where("position > #{item.position}").update_all("position = position -1")
      item.destroy!
    end
    render_ok
  end

  def delete_item_type
    baskets = basket_items.where(item_type: params[:item_type])
    baskets.destroy_all
    render_ok
  end

  def set_score
    current_basket.update_attributes!(score: params[:score])
    @questions_score = basket_items.where(item_type: current_basket.item_type).pluck(:score).sum
    @all_score = basket_items.pluck(:score).sum
  end

  def batch_set_score
    basket_items.where(item_type: params[:item_type]).update_all(score: params[:score])
    @questions_score = basket_items.where(item_type: params[:item_type]).pluck(:score).sum
    @all_score = basket_items.pluck(:score).sum
  end

  def adjust_position
    same_items = basket_items.where(item_type: current_basket.item_type)
    max_position = same_items.size
    tip_exception("position超出范围") unless params[:position].present? && params[:position].to_i <= max_position && params[:position].to_i >= 1
    ActiveRecord::Base.transaction do
      if params[:position].to_i > current_basket.position
        same_items.where("position > #{current_basket.position} and position <= #{params[:position].to_i}").update_all("position=position-1")
        current_basket.update_attributes!(position: params[:position])
      elsif params[:position].to_i < current_basket.position
        same_items.where("position < #{current_basket.position} and position >= #{params[:position].to_i}").update_all("position=position+1")
        current_basket.update_attributes!(position: params[:position])
      else
        return normal_status(-1, "排序无变化")
      end
    end
    render_ok
  end

  private

  def create_params
    params.permit(item_ids: [])
  end

  def exam_setting
    @_exam_setting = ExaminationIntelligentSetting.find_by(id: params[:exam_setting_id])
  end

  def basket_items
    @_items = params[:exam_setting_id] ? exam_setting.item_baskets : current_user.item_baskets
  end

  def current_basket
    @_current_basket = ItemBasket.find_by!(id: params[:id])
    tip_exception(403, "无权限编辑") unless current_user.admin_or_business? || @_current_basket.user_id.to_i == current_user.id ||
      @_current_basket.examination_intelligent_setting&.user_id.to_i == current_user.id
    @_current_basket
  end

  def validate_score
    tip_exception("分值不能为空") unless params[:score].present?
    tip_exception("分值需大于0") unless params[:score].to_f > 0
  end
end