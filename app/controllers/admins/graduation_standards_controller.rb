class Admins::GraduationStandardsController < Admins::BaseController

  def index
    standards = EcGraduationStandard.all.order("updated_at desc")
    @params_page = params[:page] || 1
    @standards = paginate standards
  end

  def create_standard
    ActiveRecord::Base.transaction do
      if params[:graduation_id] == "-1"
        content = params[:content]
        EcGraduationStandard.create(:content => content)
      else
        graduation = EcGraduationStandard.find_by(id: params[:graduation_id])
        graduation.update_attribute(:content, params[:content])
      end

      standards = EcGraduationStandard.all.order("updated_at desc")
      @params_page = params[:page] || 1
      @standards = paginate standards
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      @graduation = EcGraduationStandard.find_by(id: params[:id])
      @graduation.destroy
      render_success_js
    end
  end

end