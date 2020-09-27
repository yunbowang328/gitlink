module Droneable
  extend ActiveSupport::Concern

  included do
  end

  def devops_uninit?
    self.devops_step === User::DEVOPS_UNINIT
  end

  def devops_unverified?
    self.devops_step === User::DEVOPS_UNVERIFIED
  end

  def set_drone_step!(step)
    self.update_column(:devops_step, step)
  end

  def ci_certification?
    return false if self.is_a?(AnonymousUser)
    devops_unverified? && Ci::User.exists?(user_login: self.login)
  end

  def unbind_account!
    user_projects = self.projects

    user_projects.update_all(open_devops: false, open_devops_count: 0)
    set_drone_step!(User::DEVOPS_UNINIT)

    # TODO
    # 删除用户项目下的与ci相关的所有webhook
    user_projects.select(:id, :identifier, :gitea_webhook_id).each do |project|
      if project.gitea_webhook_id
        result = Gitea::Hooks::DestroyService.call(self.gitea_token, self.login, project.identifier, project.gitea_webhook_id)
        project.update_column(:gitea_webhook_id, nil) if result.status == 204
      end
    end
  end

  module ClassMethods
  end
end
