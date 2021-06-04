json.partial! "commons/success"
json.issues_count @project_issues_count
json.open_issues_count @project_open_issues_count
json.close_issues_count @project_close_issues_count
json.pr_all_count @project_pr_all_count
json.pr_count @project_pr_count
json.new_pr_count @project_new_pr_count
json.limit @limit
json.project_trends_size @project_trends_size
json.project_trends do
  json.array! @project_trends.to_a.each do |trend|
    
    #后续需要天际pullrequest 和 版本的内容
    json.partial! "detail", trend: trend
  end
end

