class AddLessonUrlToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :lesson_url, :string
  end
end
