class ItemBanksController < ApplicationController
  include PaginateHelper
  before_action :require_login
  before_action :certi_identity_auth, only: [:create, :edit, :update, :destroy, :set_public]
  before_action :find_item, except: [:index, :create]
  before_action :edit_auth, only: [:update, :destroy, :set_public]
  before_action :identity_auth, only: [:index]

  def index
    items = ItemBankQuery.call(params)
    @items_count = items.size
    @items = paginate items.includes(:item_analysis, :user, :container)
    exam = ExaminationBank.find_by(id: params[:exam_id]) if params[:exam_id].present?
    exam_setting = ExaminationIntelligentSetting.find_by(id: params[:exam_setting_id]) if params[:exam_setting_id].present?
    @item_basket_ids = if exam
                         exam.examination_items.pluck(:item_bank_id)
                       elsif exam_setting
                         exam_setting.item_baskets.pluck(:item_bank_id)
                       else
                         current_user.item_baskets.pluck(:item_bank_id)
                       end
  end

  def create
    item = ItemBank.new(user: current_user)
    ItemBanks::SaveItemService.call(item, form_params)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def edit

  end

  def update
    ItemBanks::SaveItemService.call(@item, form_params)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def destroy
    ActiveRecord::Base.transaction do
      ApplyAction.where(container_type: "ItemBank", container_id: @item.id).destroy_all
      if @item.item_type == "PROGRAM"
        @item.container&.destroy!
      else
        @item.destroy!
      end
      render_ok
    end
  end

  def set_public
    tip_exception(-1, "该试题已公开") if @item.public?
    tip_exception(-1, "请勿重复提交申请") if ApplyAction.where(container_id: @item.id, container_type: 'ItemBank', status: 0).exists?
    ApplyAction.create!(container_id: @item.id, container_type: 'ItemBank', user_id: current_user.id)
    # @item.update_attributes!(public: 1)
    render_ok
  end

  private

  def find_item
    @item = ItemBank.find_by!(id: params[:id])
  end

  def edit_auth
    current_user.admin_or_business? || @item.user == current_user
  end

  def form_params
    params.permit(:discipline_id, :sub_discipline_id, :item_type, :difficulty, :name, :analysis, tag_discipline_id: [], choices: %i[choice_text is_answer])
  end

end