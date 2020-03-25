class ProjectCategoriesController < ApplicationController
  def index
    @project_categories = ProjectCategory.search(params[:name]).without_content
  end

  def group_list
    is_admin = current_user && current_user&.admin?
    if is_admin
      projects = Project.all
    elsif current_user&.logged?
      projects = Project.joins(:members).where.not("projects.is_public = ? and (projects.user_id != ? or members.user_id != ?)", false, current_user.id,current_user.id )
    else
      projects = Project.visible
    end
    @category_group_list =
      projects.joins(:project_category).group(:project_category_id)
        .select("project_category_id, count(*) AS projects_count, project_categories.name")
  end
end
