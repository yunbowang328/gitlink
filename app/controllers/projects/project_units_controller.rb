class Projects::ProjectUnitsController < Projects::BaseController
  def create 
    if current_user.admin? ||  @project.owner?(current_user)
      ActiveRecord::Base.transaction do 
        ProjectUnit.update_by_unit_types!(@project, unit_types)
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