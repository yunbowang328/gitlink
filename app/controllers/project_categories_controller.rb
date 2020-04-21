class ProjectCategoriesController < ApplicationController
  def index
    @project_categories = ProjectCategory.search(params[:name]).without_content
  end

  def group_list
    # is_admin = current_user && current_user&.admin?
    # if is_admin
    #   projects = Project.all
    # elsif current_user&.logged?
    #   projects = Project.list_user_projects(current_user.id)
    # else
    #   projects = Project.visible
    # end
    if current_user&.logged?
      projects = Project.list_user_projects(current_user.id)
    else
      projects = Project.no_anomory_projects.visible
    end
    @category_group_list = projects.joins(:project_category).group("project_categories.id", "project_categories.name").size
  end
end
