class AddInviteCodeIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :invite_code
    execute <<-SQL
      ALTER TABLE projects MODIFY COLUMN invite_code VARCHAR(255) BINARY CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL;
    SQL
  end
end
