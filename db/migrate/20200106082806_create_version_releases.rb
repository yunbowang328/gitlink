class CreateVersionReleases < ActiveRecord::Migration[5.2]
  def change
    create_table :version_releases do |t|
      t.integer :user_id
      t.string :name
      t.text :body
      t.string :tag_name
      t.string :target_commitish
      t.boolean :draft, default: false
      t.boolean :prerelease, default: false
      t.string :tarball_url
      t.string :zipball_url
      t.string :url
      t.string :version_gid
      t.timestamps
    end
  end
end
