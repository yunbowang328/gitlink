class RenameDevOpsLanguageToCiLanguage < ActiveRecord::Migration[5.2]
  def change
    rename_table :dev_ops_languages, :ci_languages
  end
end
