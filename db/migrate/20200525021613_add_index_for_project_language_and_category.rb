class AddIndexForProjectLanguageAndCategory < ActiveRecord::Migration[5.2]
  def change
    change_column :project_categories, :id, :integer, null: false
    change_column :project_languages, :id, :integer, null: false

    ProjectCategory.update_all(projects_count:0)
    ProjectLanguage.update_all(projects_count:0)

    project_categories = Project.joins(:project_category).group("project_categories.id").size
    project_categories.each do |k,v|
      puts "#######____update_project_category_id____##############{k}"
      ProjectCategory.update_counters(k, projects_count: v)
    end

    project_languages = Project.joins(:project_language).group("project_languages.id").size
    project_languages.each do |k,v|
      puts "#######____update_project_language_id____##############{k}"
      ProjectLanguage.update_counters(k, projects_count: v)
    end
  end
end
