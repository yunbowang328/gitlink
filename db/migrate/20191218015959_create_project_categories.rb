class CreateProjectCategories < ActiveRecord::Migration[5.2]
  def change
    # create_table :project_categories do |t|
    #   t.string :name
    #   t.integer :position
    #   t.integer :projects_count, :default => 0
    #
    #   t.timestamps
    # end

    names = %w(大数据 机器学习 深度学习 人工智能 量子计算 智慧医疗 自动驾驶 其他)
    names.each do |name|
      ProjectCategory.find_or_create_by!(name: name)
    end

  end
end
