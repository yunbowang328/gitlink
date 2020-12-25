class ApplySignaturesController < ApplicationController
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