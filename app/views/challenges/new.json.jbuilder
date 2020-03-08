# 导航栏公共数据
json.partial! "challenges/top_common_data", shixun_identifier: @shixun.identifier

# st: 0 实践任务, 1 选择题任务
json.st @st

# 过关任务的默认值
json.task_pass_default @task_pass_default

json.submit_url shixun_challenges_path(@shixun, :st => @st)



