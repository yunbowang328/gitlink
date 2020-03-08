class Admins::EcTemplatesController < Admins::BaseController

  def index
    @params_page = params[:page] || 1
    templates = EcTemplate.where(nil).includes(:attachments).order("updated_at desc")
    @templates = paginate templates
  end

  def create_template
    ActiveRecord::Base.transaction do
      if params[:template_id] == "-1"
        ec_template = EcTemplate.new(name: params[:name])
        ec_template.save
      else
        ec_template = EcTemplate.find_by(id: params[:template_id])
      end

      if params[:attachment_id] != "-1"
        attachment_id = params[:attachment_id]
        attachment_tem = Attachment.find_by(id: attachment_id)

        unless attachment_tem.container_id.present? &&  attachment_tem.container_id == ec_template&.id
          attachment_tem.update_attributes(container_id: ec_template&.id, container_type: "EcTemplate")
        end
      end

      @params_page = params[:page] || 1
      templates = EcTemplate.where(nil).includes(:attachments).order("updated_at desc")
      @templates = paginate templates
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      template = EcTemplate.find_by(id: params[:id])
      template.destroy
      render_success_js
    end
  end

end
