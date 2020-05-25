class AddIndexForProjectLanguageAndCategory < ActiveRecord::Migration[5.2]
  def change
    add_index  :project_categories, :id unless index_exists?(:project_categories, :id)
    add_index  :project_laguages, :id unless index_exists?(:project_laguages, :id)

    project_categories = ProejctCategory.includes(:projects)
    project_categories.each do |i|
      puts "#######____update_project_category_id____##############{i.id}"
      ProejctCategory.reset_counters(i, :projects)
    end

    project_languages = ProjectLanguage.includes(:projects)
    project_languages.each do |i|
      puts "#######____update_project_language_id____##############{i.id}"
      ProjectLanguage.reset_counters(i, :projects)
    end
  end
end
