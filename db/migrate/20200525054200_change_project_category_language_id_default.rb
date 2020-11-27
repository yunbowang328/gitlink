class ChangeProjectCategoryLanguageIdDefault < ActiveRecord::Migration[5.2]
  def change
    execute "ALTER TABLE project_languages MODIFY COLUMN id INT AUTO_INCREMENT;"
    execute "ALTER TABLE project_categories MODIFY COLUMN id INT AUTO_INCREMENT;"
  end
end
