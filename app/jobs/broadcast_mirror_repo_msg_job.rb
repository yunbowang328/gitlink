class BroadcastMirrorRepoMsgJob < ApplicationJob
  queue_as :default

  def perform(repo_id)
    puts "############ BroadcastMirrorRepoMsgJob start ############ #{repo_id}"
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    project = repo.project

    json_data = {
      mirror_status: repo.mirror_status,
      mirror_num: repo.mirror_num,
      mirror_url: repo.mirror_url,
      first_sync: repo.first_sync?,
      identifier: repo.identifier,
      name: project.name,
      id: project.id,
      type: project.numerical_for_project_type
    }
    # 新增失败重试机制, 重试三次
    result = broadcast(project, json_data)

    if result == 0 
      count = 3
      while count > 0 
        result = broadcast(project, json_data)
        if result > 0 
          break
        end
        count -= 1
      end
    end
  end

  def broadcast(project, json_data)
    puts "############ broadcast start.......... "
    puts "############ broadcast channel_name: channel_room_#{project.id}"
    puts "############ broadcast project data: #{json_data} "

    cable_result = ActionCable.server.broadcast "channel_room_#{project.id}", project: json_data

    puts "############ broadcast result: #{cable_result > 0 ? 'successed' : 'failed'} "
    return cable_result
  end
end
