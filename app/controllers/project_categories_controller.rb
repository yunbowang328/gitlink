class ProjectCategoriesController < ApplicationController
  def index
    @project_categories = ProjectCategory.search(params[:name]).without_content
  end

  def group_list
    # if current_user&.logged?
    #   projects = Project.list_user_projects(current_user.id)
    # else
    #   projects = Project.visible
    # end
    projects = Project.no_anomory_projects.visible
    @category_group_list = projects.joins(:project_category).group("project_categories.id", "project_categories.name").size
  end
end
