class AddIndexForProjectLanguageAndCategory < ActiveRecord::Migration[5.2]
  def change
    execute "ALTER TABLE project_categories ADD PRIMARY KEY (id);"
    execute "ALTER TABLE project_languages ADD PRIMARY KEY (id);"

    # project_categories = Project.joins(:project_category).group("project_categories.id").size
    # project_categories.each do |k,v|
    #   puts "#######____update_project_category_id____##############{k}"
    #   ProjectCategory.update_counters(k, projects_count: v)
    # end

    # project_languages = Project.joins(:project_language).group("project_languages.id").size
    # project_languages.each do |k,v|
    #   puts "#######____update_project_language_id____##############{k}"
    #   ProjectLanguage.update_counters(k, projects_count: v)
    # end

    project_categories = ProjectCategory.select(:id, :projects_count).includes(:projects)
    project_categories.each do |i| 
      puts "#######____update_project_category_id____##############{i.id}"
      ProjectCategory.reset_counters(i.id, :projects)
    end

    project_languages = ProjectLanguage.select(:id, :projects_count).includes(:projects)
    project_languages.each do |i| 
      puts "#######____update_project_language_id____##############{i.id}"
      ProjectLanguage.reset_counters(i.id, :projects)
    end
  end
end
