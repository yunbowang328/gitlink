class Projects::ForkService < ApplicationService
  attr_reader :target_owner, :project, :organization

  def initialize(target_owner, project, organization=nil)
    @target_owner = target_owner
    @project      = project
    @organization = organization
  end

  def call
    ActiveRecord::Base.transaction do
      clone_project =
        @project.deep_clone include: :repository,
          only: [:name, :description,:is_public, :identifier,
            :rep_identifier, :project_category_id, :project_language_id,
            :license_id, :ignore_id, {repository: [:identifier, :hidden]}]

      clone_project.owner = @target_owner
      clone_project.forked_from_project_id = @project.id
      clone_project.save!

      new_repository = clone_project.repository
      new_repository.user = @target_owner
      new_repository.save!

      result = Gitea::Repository::ForkService.new(@project.owner, @target_owner, @project.identifier, @organization).call

      @project.update_column('forked_count', @project.forked_count + 1)
      new_repository.update_column('url', result['clone_url']) if result

      clone_project
    end
  rescue => e
    puts "clone project service error: #{e.message}"
    raise Error, e.message
  end

end
