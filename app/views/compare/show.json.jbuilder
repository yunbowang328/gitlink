json.commits_count @compare_result['Commits']&.size
# json.commits @compare_result['Commits'], partial: 'pull_requests/commit', as: :commit
json.commits do
  json.array! @compare_result['Commits'] do |commit|
    json.author do
      # TODO: 获取头像地址待优化
      forge_user = User.includes(:user_extension).select(:id, :login).find_by(login: commit['Author']['Name'])
      json.login commit['Author']['Name']
      json.name commit['Author']['Name']
      json.image_url forge_user.nil? ? '' : url_to_avatar(forge_user)
    end

    json.committer do
      # TODO: 获取头像地址待优化
      forge_user = User.includes(:user_extension).select(:id, :login).find_by(login: commit['Committer']['Name'])
      json.login commit['Committer']['Name']
      json.name commit['Committer']['Name']
      json.image_url forge_user.nil? ? '' : url_to_avatar(forge_user)
    end
    json.timestamp render_unix_time(commit['Committer']['When'])
    json.time_from_now time_from_now(commit['Committer']['When'])
    json.created_at render_format_time_with_date(commit['Committer']['When'])
    json.message commit['CommitMessage']
    json.sha commit['Sha']
  end
end

json.diff do
  if @compare_result['Diff'].blank?
    json.nil!
  else
    json.files_count @compare_result['Diff']['NumFiles']
    json.total_addition @compare_result['Diff']['TotalAddition']
    json.total_deletion @compare_result['Diff']['TotalDeletion']

    # TODO:  解决render partil耗时间问题
    # json.files @compare_result['Diff']['Files'], partial: 'pull_requests/diff_file', as: :file, locals: {sha: @compare_result['LatestSha']}
    json.files do
      json.array! @compare_result['Diff']['Files'] do |file|
        json.sha @compare_result['LatestSha']
        json.name file['Name']
        json.old_name file['OldName']
        json.index file['Index']
        json.addition file['Addition']
        json.deletion file['Deletion']
        json.type file['Type']
        json.isCreated file['IsCreated']
        json.isDeleted file['IsDeleted']
        json.isBin file['IsBin']
        json.isLFSFile file['IsLFSFile']
        json.isRenamed file['IsRenamed']
        json.isSubmodule file['IsSubmodule']
        json.isLFSFile file['IsLFSFile']
        json.sections do
          json.array! file['Sections'] do |section|
            json.fileName section['FileName']
            json.name section['Name']
            json.lines do
              json.array! section['Lines'] do |line|
                json.leftIdx line['LeftIdx']
                json.rightIdx line['RightIdx']
                json.type line['Type']
                json.content line['Content']
                json.sectionInfo do
                  if line['SectionInfo'].blank?
                    json.nil!
                  else
                    json.path line['SectionInfo']['Path']
                    json.lastLeftIdx line['SectionInfo']['LastLeftIdx']
                    json.lastRightIdx line['SectionInfo']['LastRightIdx']
                    json.leftIdx line['SectionInfo']['LeftIdx']
                    json.rightIdx line['SectionInfo']['RightIdx']
                    json.leftHunkSize line['SectionInfo']['LeftHunkSize']
                    json.rightHunkSize line['SectionInfo']['RightHunkSize']
                  end
                end
              end
            end
          end
        end
      end
    end

  end
end
