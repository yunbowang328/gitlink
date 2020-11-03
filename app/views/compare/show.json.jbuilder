json.commits_count @compare_result['Commits']&.size
json.commits @compare_result['Commits'], partial: 'pull_requests/commit', as: :commit

json.diff do
  json.files_count @compare_result['Diff']['NumFiles']
  json.total_addition @compare_result['Diff']['TotalAddition']
  json.total_deletion @compare_result['Diff']['TotalDeletion']
  json.files @compare_result['Diff']['Files'], partial: 'pull_requests/diff_file', as: :file
end
