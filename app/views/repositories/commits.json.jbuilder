unless @hash_commit[:status].present?   #如果有状态值，则表示报错了
  json.total_count @hash_commit[:total_count]
  json.commits do
    json.array! @hash_commit[:body] do |commit|
      json.sha commit['sha']
      json.message commit['commit']['message']
      json.timestamp render_unix_time(commit['commit']['author']['date'])
      json.time_from_now time_from_now(commit['commit']['author']['date'])
      json.partial! 'author', user: @project.owner
    end
  end
end

