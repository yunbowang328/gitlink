class AddVersionIdIndex < ActiveRecord::Migration[5.2]
  def change
    execute "ALTER TABLE versions ADD PRIMARY KEY (id);"
  end
end
