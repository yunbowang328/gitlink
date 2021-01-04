class ApplySignaturesController < ApplicationController
  include ApplicationHelper
  before_action :find_project, only: [:index, :create, :update]
  before_action :require_owner, only: [:update]
  before_action :find_apply_signature, only: [:update]

  def index 
    @apply_signatures = @project.apply_signatures.with_status(status).includes(user: :user_extension)
    @apply_signatures = @apply_signatures.joins(:user).where("LOWER(concat(users.lastname, users.firstname, users.login, users.mail)) LIKE ?", "%#{search.split(" ").join('|')}%")
    @apply_signatures = kaminari_paginate(@apply_signatures)
  end

  def template_file
    license = License.find_by_name("PHengLEI")
    file = license.attachments.take
    normal_status(-1, "文件不存在") if file.blank?
    send_file(absolute_path(local_path(file)), filename: file.title,stream:false, type: file.content_type.presence || 'application/octet-stream')
  end

  def create 
    ActiveRecord::Base.transaction do
      begin
        @signature = current_user.apply_signatures.find_or_create_by!(project_id: params[:project_id])
        @signature.status = 0
        @signature.attachments = Attachment.none
        @attachment = Attachment.find_by_id(params[:attachment_id])
        @attachment.container = @signature
        @signature.save!
        @attachment.save!
      rescue Exception => e
        tip_exception("#{e}")
        raise ActiveRecord::Rollback
      end
      render_json
    end
  end

  def update
    @apply_signature.update_attributes!(apply_signature_params)
    if @apply_signature.status == "passed"
      Projects::AddMemberInteractor.call(@apply_signature.project.owner, @apply_signature.project, @apply_signature.user, "read", true)
    else
      Projects::DeleteMemberInteractor.call(@apply_signature.project.owner, @apply_signature.project, @apply_signature.user)
    end
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def find_project
    @project = Project.find_by_id(params[:project_id])
    normal_status(-1, "项目不存在") unless @project.present?
  end

  def find_apply_signature
    @apply_signature = ApplySignature.find_by_id(params[:id])
    normal_status(-1, "特殊许可申请不存在") unless @apply_signature.present?
    normal_status(1, "已经是该状态了") if @apply_signature.status == params[:status]
  end

  def apply_signature_params
    params.permit(:status)
  end

  def search 
    params.fetch(:search, "").to_s.downcase
  end

  def status 
    params.fetch(:status, "waiting")
  end

  def require_owner
    normal_status(403, "") unless @project.owner?(current_user)
  end
end 