class Repositories::DetailService < ApplicationService
  include Repository::LanguagesPercentagable
  attr_reader :owner, :repo, :user
  def initialize(owner, repo, user)
    @owner = owner
    @repo = repo
    @user = user
  end

  def call
    if @repo.project.educoder?
      return {
        repo: {},
        release: [],
        branch: [],
        tag: [],
        contributor: [],
        language: {},
        readme: {}
      }
    else
      return {
        repo: repo_suitable,
        release: release_suitable,
        branch: branch_suitable,
        tag: tag_suitable,
        contributor: contributor_suitable,
        language: language_suitable,
        readme: readme_suitable
      }
    end
  end

  private
  def repo_suitable
    Gitea::Repository::GetService.call(@owner, @repo.identifier)
  end

  def release_suitable
    Gitea::Versions::ListService.call(@owner.gitea_token, @owner.try(:login), @repo.try(:identifier))
  end

  def branch_suitable
    branches = Gitea::Repository::Branches::ListService.call(@owner, @repo.identifier)
    branches.is_a?(Hash) && branches[:status] == :error ? [] : branches
  end

  def tag_suitable
    tags = Gitea::Repository::Tags::ListService.call(@owner&.gitea_token, @owner.login, @repo.identifier)
    tags.is_a?(Hash) && tags[:status] == -1 ? [] : tags
  end

  def contributor_suitable
    Gitea::Repository::Contributors::GetService.call(@owner, @repo.identifier)
  end

  def language_suitable
    result = Gitea::Repository::Languages::ListService.call(@owner.login, @repo.identifier, @user&.gitea_token)
    result[:status] === :success ? hash_transform_precentagable(result[:body]) : nil
  end

  def readme_suitable
    result = Gitea::Repository::Readme::GetService.call(@owner.login, @repo.identifier, @repo.default_branch, @owner.gitea_token)
    result[:status] === :success ? result[:body] : nil
  end
end
