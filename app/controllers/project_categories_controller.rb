class ProjectCategoriesController < ApplicationController
  def index
    @project_categories = ProjectCategory.search(params[:name]).without_content
  end

  def group_list
    @category_group_list =
      Project.visible.joins(:project_category).group(:project_category_id)
        .select("project_category_id, count(*) AS projects_count, project_categories.name")
  end
end
