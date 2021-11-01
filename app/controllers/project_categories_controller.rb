class ProjectCategoriesController < ApplicationController
  def index
    # @project_categories = ProjectCategory.search(params[:name]).without_content
    q = ProjectCategory.ransack(name_cont: params[:name])
    @project_categories = q.result(distinct: true)
  end

  def pinned_index
    @project_categories = ProjectCategory.where.not(pinned_index: 0).order(pinned_index: :desc)
  end

  def group_list
    @project_categories = ProjectCategory.where('projects_count > 0').order(projects_count: :desc)
    # projects = Project.no_anomory_projects.visible
    # @category_group_list = projects.joins(:project_category).group("project_categories.id", "project_categories.name").size
  end
end
