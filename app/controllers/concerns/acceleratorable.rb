module Acceleratorable
  extend ActiveSupport::Concern

  def enable_accelerator?(clone_addr)
    is_foreign_url?(clone_addr) && config_accelerator?
  end
  
  def accelerator_url(repo_name)
    [accelerator_domain, accelerator_username, "#{repo_name}.git"].join('/')
  end

  def github_domain
    'github.com'
  end

  def gitlab_domain
    'gitlab.com'
  end

  def accelerator_domain
    Gitea.gitea_config[:accelerator]["domain"]
  end

  def accelerator_username
    Gitea.gitea_config[:accelerator]["access_key_id"]
  end
  
  def config_accelerator?
    Gitea.gitea_config[:accelerator].present?
  end
  
  def is_foreign_url?(clone_addr)
    clone_addr.include?(github_domain) || clone_addr.include?(gitlab_domain)
  end
  
end