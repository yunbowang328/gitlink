class ChangeColumnsNameFromPullRequests < ActiveRecord::Migration[5.2]
  def change
    rename_column :pull_requests, :pull_request_id, :gitea_id
    rename_column :pull_requests, :gpid, :gitea_number


    PullRequest.find_each do |pr|
      next if pr.gitea_number.blank?

      project = pr.project
      next if project.blank?
      
      owner = project&.owner
      gitea_pull = Gitea::PullRequest::GetService.call(owner.login, project.identifier, pr.gitea_number, owner&.gitea_token)
      
      next if gitea_pull.blank?

      pr.update_column(:gitea_id, gitea_pull["id"])
    end

  end
end
