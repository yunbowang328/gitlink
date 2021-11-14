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
      contributor: contributor_suitable,
      language: language_suitable,
      branch_tag_total_count: branch_tag_total_count
    }
  rescue 
    return {
      repo: {},
      release: [],
      branch: [],
      branch_type: [],
      tag: [],
      contributor: [],
      language: {},
      readme: {}
    }
  end

  private
  def branch_tag_total_count
    Gitea::Repository::GetBranchAndTagTotalNumService.call(@owner.login, @repo.identifier, @owner.gitea_token)
  end
  
  def repo_suitable
    Gitea::Repository::GetService.call(@owner, @repo.identifier)
  end

  def contributor_suitable
    contributors = Gitea::Repository::Contributors::GetService.call(@owner, @repo.identifier)
    contributors.is_a?(Hash) && contributors.key?(:status) ? [] : contributors
  end

  def language_suitable
    result = Gitea::Repository::Languages::ListService.call(@owner.login, @repo.identifier, @user&.gitea_token)
    result[:status] === :success ? hash_transform_precentagable(result[:body]) : nil
  end
end
