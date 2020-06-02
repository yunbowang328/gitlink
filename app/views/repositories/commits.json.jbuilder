if @hash_commit.blank?   #如果有状态值，则表示报错了
  json.total_count 0
  json.commits []
else
  json.total_count @hash_commit[:total_count]
  json.commits do
    json.array! @hash_commit[:body] do |commit|
      Rails.logger.info("#######______commit______#########{commit}")
      commiter = commit['committer']
      if commiter.present? 
        commit_user = commiter['name']
        forge_user = User.simple_select.find_by(login: commit_user)
      end
      json.sha commit['sha']
      json.message commit['commit']['message']
      json.timestamp render_unix_time(commit['commit']['author']['date'])
      json.time_from_now time_from_now(commit['commit']['author']['date'])
      if forge_user 
        json.partial! 'author', user: forge_user 
      else 
        json.author nil
      end
    end
  end
end
