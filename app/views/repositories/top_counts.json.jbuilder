json.tags_count @tags_count
json.branches_count @branches_count
json.commits_count @commits_count
json.version_releasesed_count @project.releases_size(current_user.try(:id), "released")  #已发行的版本
if @result 
  json.size replace_bytes_to_b(number_to_human_size(@result['size'].to_i*1024))
end
