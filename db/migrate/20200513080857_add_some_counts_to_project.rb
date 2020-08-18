class AddSomeCountsToProject < ActiveRecord::Migration[5.2]
  def change
    # add_column :projects, :versions_count, :integer, default: 0  #里程碑
    # add_column :repositories, :version_releases_count, :integer, default: 0  #版本发布d
    # add_column :projects, :issue_tags_count, :integer, default: 0   #标签的数量

    # Project.includes(:versions, :issue_tags, repository: :version_releases).find_each do |p|
    #   puts "###____change_p.id____######{p.id}"
    #   r = p&.repository 
    #   Project.reset_counters p.id, :versions
    #   Project.reset_counters p.id, :issue_tags
      
    #   if r.present? 
    #     puts "###____change_p.id____######{r.id}"
    #     Repository.reset_counters r.id, :version_releases
    #   end
      
    # end
  end
end
