# json.key_format! camelize: :lower
if @commit.blank?   #如果有状态值，则表示报错了
  json.total_count 0
  json.commits []
else
  json.files_count @commit_diff['NumFiles']
  json.total_addition @commit_diff['TotalAddition']
  json.total_deletion @commit_diff['TotalDeletion']
  json.files @commit_diff['Files'], partial: 'pull_requests/diff_file', as: :file, locals: {sha: @sha}

  json.partial! 'commit', commit: @commit, project: @project
  json.parents @commit['parents'] do |parent|
    json.sha parent['sha']
    # json.url EduSetting.get('host_name') + commit_repository_path(@repo, parent['sha'])
  end
  json.branch @commit['branch']
end
