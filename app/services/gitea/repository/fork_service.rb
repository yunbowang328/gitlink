class Gitea::Repository::ForkService < Gitea::ClientService
  attr_reader :old_owner, :target_owner, :repo_name, :organization

  # old_owner: 被clone的项目(源项目)拥有者
  # target_owner: clone后的醒目(新项目)的拥有者
  # body:
  # {
  #   "organization": "string" #组织名称
  # }
  def initialize(old_owner, target_owner, repo_name, organization=nil)
    @old_owner    = old_owner
    @target_owner = target_owner
    @repo_name    = repo_name
  end

  def call
    post(url, request_params)
  end

  private

  def request_params
    hash = Hash.new.merge(token: target_owner.gitea_token)
    hash = hash.merge(data: {organization: organization}) if organization
    hash
  end

  def url
    "/repos/#{old_owner.login}/#{repo_name}/forks".freeze
  end

end
