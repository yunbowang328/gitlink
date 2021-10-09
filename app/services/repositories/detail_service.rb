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
      release: release_suitable,
      branch: branch_suitable,
      tag: tag_suitable,
      contributor: contributor_suitable,
      language: language_suitable
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
  def repo_suitable
    Gitea::Repository::GetService.call(@owner, @repo.identifier)
  end

  def release_suitable
    releases = Gitea::Versions::ListService.call(@owner.gitea_token, @owner.try(:login), @repo.try(:identifier), {page: 1, limit: 1})
    releases.is_a?(Hash) && releases[:status] == -1 ? [] : releases
  end

  def branch_suitable
    branches = Gitea::Repository::Branches::ListService.call(@owner, @repo.identifier)
    branches.is_a?(Hash) && branches.key?(:status) ? [] : branches
  end

  def tag_suitable
    tags = Gitea::Repository::Tags::ListService.call(@owner&.gitea_token, @owner.login, @repo.identifier)
    tags.is_a?(Hash) && tags[:status] == -1 ? [] : tags
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
