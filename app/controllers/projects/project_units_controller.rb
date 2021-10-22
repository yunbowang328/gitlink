class Projects::ProjectUnitsController < Projects::BaseController
  def index 
    @project_units = @project.project_units
  end

  def create 
    if current_user.admin? || @project.manager?(current_user)
      ActiveRecord::Base.transaction do 
        before_units, after_units = ProjectUnit.update_by_unit_types!(@project, unit_types)
        SendTemplateMessageJob.perform_later('ProjectSettingChanged', current_user.id, @project&.id, {navbar: true}) unless before_units.eql?(after_units) if Site.has_notice_menu?
        render_ok
      end
    else 
      render_forbidden('你没有权限操作')
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def unit_types
    params.fetch(:unit_types, [])
  end
end