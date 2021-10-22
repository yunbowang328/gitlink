class AddShaToVersionReleases < ActiveRecord::Migration[5.2]
  def change
    add_column :version_releases, :sha, :string
  end
end
