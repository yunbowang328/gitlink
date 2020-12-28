class ApplySignaturesController < ApplicationController
  include ApplicationHelper

  def template_file
    license = License.find_by_name("PHengLET")
    file = license.attachments.take
    normal_status(-1, "文件不存在") if file.blank?
    send_file(absolute_path(local_path(file)), filename: file.title,stream:false, type: file.content_type.presence || 'application/octet-stream')
  end

  def create 
    ActiveRecord::Base.transaction do
      begin
        @signature = current_user.apply_signatures.create!(project_id: params[:project_id])
        @attachment = Attachment.find_by_id(params[:attachment_id])
        @attachment.container = @signature
        @attachment.save!
      rescue Exception => e
        tip_exception("#{e}")
        raise ActiveRecord::Rollback
      end
      render_json
    end
  end
end 