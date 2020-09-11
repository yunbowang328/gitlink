class ProjectCategoriesController < ApplicationController
  def index
    # @project_categories = ProjectCategory.search(params[:name]).without_content
    q = ProjectCategory.ransack(name_cont: params[:name])
    @project_categories = q.result(distinct: true)
  end

  def group_list
    # if current_user&.logged?
    #   projects = Project.list_user_projects(current_user.id)
    # else
    #   projects = Project.visible
    # end
    @project_children_categories = ProjectCategory.descendants
    projects = Project.no_anomory_projects.visible
    categories = projects.joins(:project_category).where(project_categories: {ancestry: nil}).group("project_categories.name", "project_categories.id").size.keys.to_h
    extra_category_id = categories.delete("其他")
    categories = categories.merge({"其他": extra_category_id}) if extra_category_id.present? #其他的放在最后面
    @category_group_list = categories  
  end
end
