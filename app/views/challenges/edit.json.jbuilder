json.partial! "challenges/top_common_data", shixun_identifier: @shixun.identifier
json.chooses do
  json.array! @chooses do |choose|
    json.choose_id choose.id
    json.type choose.category
  end
end
json.st @challenge.st

if @tab == 0
  # 本关任务tab的编辑模式
  json.(@challenge, :id, :subject, :task_pass, :difficulty, :score, :exec_time, :st)
  json.tags @challenge.challenge_tags.map(&:name)
elsif @tab == 1
  # 评测设置的编辑模式
  json.(@challenge, :id, :path, :exec_path, :show_type, :original_picture_path, :expect_picture_path, :picture_path,
      :web_route, :test_set_score, :test_set_average, :exec_time)
  json.has_web_route @shixun.has_web_route?
  json.test_sets @challenge.test_sets do |set|
    json.hidden (set.is_public ? 0 : 1)
    json.(set, :input, :output, :score, :match_rule)
  end
elsif @tab == 2
  # 参考答案
  json.(@challenge, :answer)
end