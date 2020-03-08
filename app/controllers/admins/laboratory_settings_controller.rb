class Admins::LaboratorySettingsController < Admins::BaseController
  def show
    @laboratory = current_laboratory
  end

  def update
    Admins::SaveLaboratorySettingService.call(current_laboratory, form_params)
    render_ok
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:laboratory_id])
  end

  def form_params
    params.permit(:identifier, :name,
                  :nav_logo, :login_logo, :tab_logo, :oj_banner,
                  :subject_banner, :course_banner, :competition_banner, :moop_cases_banner,
                  :footer, navbar: %i[name link hidden])
  end
end