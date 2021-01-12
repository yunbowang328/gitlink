json.files_count @files_result['NumFiles']
json.total_addition @files_result['TotalAddition']
json.total_deletion @files_result['TotalDeletion']

# TODO: 解决 render partil file性能问题
# json.files @files_result['Files'], partial: 'diff_file', as: :file, locals: {sha: @files_result['LatestSha']}
json.files do
  json.array! @files_result['Files'] do |file|
    json.sha @files_result['LatestSha']
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
