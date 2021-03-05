class AddLoginDefaultToCiTemplates < ActiveRecord::Migration[5.2]
  def change
    Ci::Template.find_each do |template|
      template.update_column(:login, "admin")
    end
  end
end
