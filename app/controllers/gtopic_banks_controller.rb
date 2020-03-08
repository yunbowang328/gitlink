class GtopicBanksController < ApplicationController
  before_action :require_login
  before_action :find_bank, :bank_visit_auth
  before_action :bank_admin, only: [:edit, :update]

  def show
    @bank_attachments = @bank.attachments
  end

  def edit
    @attachments = @bank.attachments
  end

  def update
    ActiveRecord::Base.transaction do
      @bank.update_attributes(gtopic_bank_params)
      Attachment.associate_container(params[:attachment_ids], @bank.id, @bank.class) if params[:attachment_ids]
      normal_status(0, "更新成功")
    end
  end

  private

  def find_bank
    @bank = GtopicBank.find_by!(id: params[:id])
  end

  def bank_admin
    tip_exception(403, "无权限") unless @bank.user_id == current_user.id || current_user.admin_or_business?
  end

  def gtopic_bank_params
    tip_exception("name参数不能为空") if params[:gtopic_bank][:name].blank?
    tip_exception("description参数不能为空") if params[:gtopic_bank][:description].blank?
    params.require(:gtopic_bank).permit(:name, :topic_type, :topic_source, :topic_property_first, :description,
                                        :topic_property_second, :source_unit, :topic_repeat, :province, :city)
  end
end
