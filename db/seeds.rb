# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create_table :outputs do |t|
#   t.integer :code
#   t.integer :game_id
#   t.text :msg
#   t.longtext :out_put
#   t.integer :test_set_position
#   t.text :actual_output
#
#   t.timestamps
# end
#

# video_p = {
#   user_id: 1,
#   title: "第一个测试的.mp4",
#   uuid: "748fa8165062433781ccd87f1f815403",
#   cover_url: "http://outin-396971199eed11e991a100163e1c7426.oss-cn-shanghai.aliyuncs.com/sv/30ec9167-16ca9111f7d/30ec9167-16ca9111f7d.mp4",
#   file_url: "http://outin-396971199eed11e991a100163e1c7426.oss-cn-shanghai.aliyuncs.com/sv/30ec9167-16ca9111f7d/30ec9167-16ca9111f7d.mp4",
#   status: "pending",
#   vod_status: "uploaded",
#   published_at: nil,
#   filesize: 14877403
# }


# lan_ids = ProjectLanguage.select(:name, :id).pluck(:id) * 4
# projects = Project.where(project_language_id: [nil, ""])
# projects.each_with_index do |p,index|
#   p.update_attribute(:project_language_id, lan_ids[index])
# end
