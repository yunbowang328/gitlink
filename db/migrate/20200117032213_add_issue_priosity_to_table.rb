# encoding: UTF-8
class AddIssuePriosityToTable < ActiveRecord::Migration[5.2]
  #本地需要修改，线上不用修改
  # def change
  #   create_table :issue_priorities do |t|
  #     t.string :name, charset: :utf8
  #     t.integer :position
  #     t.timestamps
  #   end
  #   name = %w(低 正常 高 紧急 立刻)
  #   position = %w(1 2 3 4 5)
  #   name.each_with_index do |n, index|
  #     IssuePriority.create!(name:n.to_s, position: position[index])
  #   end
  # end
end
