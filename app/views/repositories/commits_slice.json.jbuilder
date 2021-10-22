if @hash_commit.blank?   #如果有状态值，则表示报错了
  json.total_count 0
  json.commits []
else
  json.total_count @hash_commit[:total_count]
  json.commit_dates do 
    json.array! @hash_commit[:body] do |commit_date|
      json.commit_date commit_date["commit_date"]
      json.commits do
        json.array! commit_date["Commits"] do |commit|
          commiter = commit['committer']
    
          forge_user = 
            if commiter.present? 
              User.simple_select.find_by(gitea_uid: commiter['id'])
            end
            
          json.sha commit['sha']
          json.message commit['commit']['message']
          json.timestamp render_unix_time(commit['commit']['author']['date'])
          json.time_from_now time_from_now(commit['commit']['author']['date'])
          if forge_user 
            json.partial! 'author', user: forge_user 
          else 
            json.author do
              json.id nil 
              json.login commit['commit']['author']['name']
              json.type nil
              json.name commit['commit']['author']['name']
              json.image_url User::Avatar.get_letter_avatar_url(commit['commit']['author']['name'])
            end
          end
        end
      end
    end
  end

end
