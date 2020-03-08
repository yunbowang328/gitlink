# 导航栏公共数据
json.partial! "challenges/top_common_data", shixun_identifier: @shixun.identifier
json.(@challenge, :id, :subject, :task_pass, :difficulty, :score, :exec_time, :st)
json.tags @challenge.challenge_tags.map(&:name)






