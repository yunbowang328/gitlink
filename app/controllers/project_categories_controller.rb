class ProjectCategoriesController < ApplicationController
  def index
    # @project_categories = ProjectCategory.search(params[:name]).without_content
    q = ProjectCategory.ransack(name_cont: params[:name])
    @project_categories = q.result(distinct: true)
  end

  def group_list
    # @project_categories = ProjectCategory.where('projects_count > 0').order(projects_count: :desc)
    @project_categories = ProjectCategory.eager_load(:projects)
        .where(projects: {is_public: true})
  end
end
