class ExaminationIntelligentSettingsController < ApplicationController
  before_action :require_login
  before_action :certi_identity_auth, only: [:create, :optinal_items, :save_exam, :exchange_one_item, :exchange_items]
  before_action :find_exam, only: [:exchange_one_item, :exchange_items, :save_exam]

  def optinal_items
    sub_discipline_id = params[:sub_discipline_id]
    tag_discipline_id = params[:tag_discipline_id]
    difficulty = params[:difficulty]
    source = params[:source]

    items = OptionalItemQuery.call(sub_discipline_id, tag_discipline_id, difficulty, source)
    @single_question_count = items.select{ |item| item.item_type == "SINGLE" }.size
    @multiple_question_count = items.select{ |item| item.item_type == "MULTIPLE" }.size
    @judgement_question_count = items.select{ |item| item.item_type == "JUDGMENT" }.size
    @program_question_count = items.select{ |item| item.item_type == "PROGRAM" }.size
  end

  def create
    ActiveRecord::Base.transaction do
      exam = ExaminationIntelligentSetting.new(user: current_user)
      # 保存试卷基础信息
      exam = ExaminationIntelligentSettings::SaveSettingService.call(exam, form_params)
      render_ok({exam_setting_id: exam.id})
    end
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def save_exam
    new_exam = ExaminationBank.new(user: current_user)
    # 保存试卷基础信息
    ExaminationIntelligentSettings::SaveExaminationService.call(new_exam, save_params, @exam)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def exchange_one_item
    item = @exam.item_baskets.find_by!(item_bank_id: params[:item_id])
    exam_type_setting = @exam.examination_type_settings.find_by!(item_type: item.item_type)

    # 获取可选的题
    items = OptionalItemQuery.call(@exam.sub_discipline_id, @exam.tag_discipline_containers.pluck(:tag_discipline_id), @exam.difficulty, @exam.public)

    # 可选题中去掉已组卷的试题
    type_items = items.select{ |t_item| t_item.item_type == item.item_type }
    optional_item_ids = (type_items.pluck(:id) - @exam.item_baskets.where(item_type: item.item_type).pluck(:item_bank_id)).uniq

    # 如果可选的题数等于0则提示无可换的题
    tip_exception("无可换的题") if optional_item_ids.size == 0

    new_item = ItemBank.find optional_item_ids.sample(1).first
    ActiveRecord::Base.transaction do
      @exam.item_baskets << ItemBasket.new(item_bank_id: new_item.id, position: item.position, score: item.score, item_type: new_item.item_type)
      item.destroy!
    end
    render_ok
  end

  def exchange_items
    exam_type_setting = @exam.examination_type_settings.find_by!(item_type: params[:item_type])
    choosed_items = @exam.item_baskets.where(item_type: params[:item_type])

    # 获取可选的题
    items = OptionalItemQuery.call(@exam.sub_discipline_id, @exam.tag_discipline_containers.pluck(:tag_discipline_id), @exam.difficulty, @exam.public)
    type_items = items.select{ |t_item| t_item.item_type == params[:item_type] }

    # 可选题中去掉已组卷的试题
    choosed_item_ids = choosed_items.pluck(:item_bank_id)
    optional_item_ids = (type_items.pluck(:id) - choosed_item_ids).uniq

    # 如果可选的题数等于0则提示无可换的题
    tip_exception("无可换的题") if optional_item_ids.size == 0

    # 如果可选题数小于设置的题数（n），则在原来的选题中随机选n个，确保换题时能选到新的题
    if optional_item_ids.size < exam_type_setting.count
      absence_count = exam_type_setting.count - optional_item_ids.size
      optional_item_ids = optional_item_ids + choosed_item_ids.sample(absence_count)
    end

    ActiveRecord::Base.transaction do
      # 取试题分数
      score = choosed_items.first&.score || (params[:item_type] == "PROGRAM" ? 10 : 5)
      choosed_items.destroy_all
      optional_item_ids.sample(exam_type_setting.count).each_with_index do |item_id, index|
        new_item = ItemBank.find item_id
        @exam.item_baskets << ItemBasket.new(item_bank_id: new_item.id, position: index+1, score: score, item_type: new_item.item_type)
      end
    end
    render_ok
  end

  private

  def find_exam
    @exam = ExaminationIntelligentSetting.find_by!(id: params[:id])
    tip_exception(403,"无权限编辑") unless current_user.admin_or_business? || @exam.user_id == current_user.id
  end

  def form_params
    params.permit(:discipline_id, :sub_discipline_id, :difficulty, :source, tag_discipline_id: [], question_settings: %i[item_type count])
  end

  def save_params
    params.permit(:name, :duration)
  end
end