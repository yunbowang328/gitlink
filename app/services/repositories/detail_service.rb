class Repositories::DetailService < ApplicationService
  include Repository::LanguagesPercentagable
  attr_reader :owner, :repo, :user
  def initialize(owner, repo, user)
    @owner = owner
    @repo = repo
    @user = user
  end

  def call
    return {
      repo: repo_suitable,
      branch_tag_total_count: branch_tag_total_count
    }
  rescue 
    return {
      repo: {},
      branch_tag_total_count: {}
    }
  end

  private
  def branch_tag_total_count
    Gitea::Repository::GetBranchAndTagTotalNumService.call(@owner.login, @repo.identifier, @owner.gitea_token)
  end
  
  def repo_suitable
    Gitea::Repository::GetService.call(@owner, @repo.identifier)
  end
end
