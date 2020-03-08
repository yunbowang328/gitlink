class ExaminationBanksController < ApplicationController
  include PaginateHelper
  before_action :require_login
  before_action :certi_identity_auth, only: [:create, :edit, :update, :destroy, :set_public, :revoke_item]
  before_action :find_exam, except: [:index, :create]
  before_action :edit_auth, only: [:update, :destroy, :set_public, :revoke_item]
  before_action :identity_auth, only: [:index]

  def index
    exams = ExaminationBankQuery.call(params)
    @exams_count = exams.size
    @exams = paginate exams.includes(:user, :examination_items)
  end

  def show
    @items = @exam.examination_items
    @single_questions = @items.where(item_type: "SINGLE")
    @multiple_questions = @items.where(item_type: "MULTIPLE")
    @judgement_questions = @items.where(item_type: "JUDGMENT")
    @program_questions = @items.where(item_type: "PROGRAM")
  end

  def create
    ActiveRecord::Base.transaction do
      exam = ExaminationBank.new(user: current_user)
      # 保存试卷基础信息
      exam = ExaminationBanks::SaveExaminationBankService.call(exam, form_params)

      # 将试题篮中的试题发送到试卷，试卷的题目与试题独立
      current_user.item_baskets.includes(:item_bank).each do |basket|
        item = basket.item_bank
        if item.present?
          new_item = ExaminationItem.new
          new_item.new_item(item, exam, basket.score, basket.position)
        end
      end

      current_user.item_baskets.destroy_all
    end
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def edit; end

  def update
    ExaminationBanks::SaveExaminationBankService.call(@exam, form_params)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def destroy
    ActiveRecord::Base.transaction do
      ApplyAction.where(container_type: "ExaminationBank", container_id: @exam.id).destroy_all
      @exam.destroy!
      render_ok
    end
  end

  def set_public
    tip_exception(-1, "该试卷已公开") if @exam.public?
    tip_exception(-1, "请勿重复提交申请") if ApplyAction.where(container_id: @exam.id, container_type: "ExaminationBank", status: 0).exists?
    ApplyAction.create!(container_id: @exam.id, container_type: "ExaminationBank", user_id: current_user.id)
    # @exam.update_attributes!(public: 1)
    render_ok
  end

  def revoke_item
    item = @exam.examination_items.find_by!(item_bank_id: params[:item_id])
    ActiveRecord::Base.transaction do
      @exam.examination_items.where(item_type: item.item_type).where("position > #{item.position}").update_all("position = position -1")
      item.destroy!
    end
    render_ok
  end

  private

  def form_params
    params.permit(:discipline_id, :sub_discipline_id, :difficulty, :name, :duration, tag_discipline_id: [])
  end

  def find_exam
    @exam = ExaminationBank.find_by!(id: params[:id])
  end

  def edit_auth
    current_user.admin_or_business? || @exam.user == current_user
  end
end