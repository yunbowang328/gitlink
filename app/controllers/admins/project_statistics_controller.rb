class Admins::ProjectStatisticsController < Admins::BaseController


  def index
    projects = Project.project_statics_select.all
    by_time = params[:time]
    project_type = params[:project_type]
    is_private = params[:is_private]
    project_category_id = params[:project_category_id]
    project_language_id = params[:project_language_id]
    license_id = params[:license_id]

    projects = projects.where(project_type: project_type)  if project_type.present?
    projects = projects.where(is_private: is_private)  if is_private.present?
    projects = projects.where(project_category_id: project_category_id)  if project_category_id.present?
    projects = projects.where(project_language_id: project_language_id)  if project_language_id.present?
    projects = projects.where(license_id: license_id)  if license_id.present?

    if by_time.present?
      case by_time.to_s
      when "week"
        projects = projects.group_by_week(:created_on).size
      when "month"
        projects = projects.group_by_month(:created_on).size
      when "quarter"
        projects = projects.group_by_month(:created_on).size
      when "year"
        projects = projects.group_by_year(:created_on).size
      else
        projects = projects.group_by_day(:created_on).size
      end
    end
    @projects = projects
  end

  def visits_static
    projects = Project.project_statics_select.all
    by_time = params[:time]
    project_type = params[:project_type]
    is_private = params[:is_private]
    project_category_id = params[:project_category_id]
    project_language_id = params[:project_language_id]
    license_id = params[:license_id]

    projects = projects.where(project_type: project_type)  if project_type.present?
    projects = projects.where(is_private: is_private)  if is_private.present?
    projects = projects.where(project_category_id: project_category_id)  if project_category_id.present?
    projects = projects.where(project_language_id: project_language_id)  if project_language_id.present?
    projects = projects.where(license_id: license_id)  if license_id.present?

    if by_time.present?
      case by_time.to_s
      when "week"
        projects = projects.group_by_week(:created_on).size
      when "month"
        projects = projects.group_by_month(:created_on).size
      when "quarter"
        projects = projects.group_by_month(:created_on).size
      when "year"
        projects = projects.group_by_year(:created_on).size
      else
        projects = projects.group_by_day(:created_on).size
      end
    end
    @projects = projects
  end



end