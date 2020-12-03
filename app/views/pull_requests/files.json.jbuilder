json.files_count @files_result['NumFiles']
json.total_addition @files_result['TotalAddition']
json.total_deletion @files_result['TotalDeletion']
json.files @files_result['Files'], partial: 'diff_file', as: :file, locals: {sha: @files_result['LatestSha']}
