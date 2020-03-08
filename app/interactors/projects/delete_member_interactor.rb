module Projects
  class DeleteMemberInteractor
    def self.call(owner, project, collaborator)
      interactor = new(owner, project, collaborator)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(owner, project, collaborator)
      @owner        = owner
      @project      = project
      @collaborator = collaborator
    end

    def success?
      @error.nil?
    end

    def run
      ActiveRecord::Base.transaction do
        gitea_result = Gitea::Repository::Members::DeleteService.new(owner, project.identifier, collaborator.login).call
        if gitea_result.status == 204
          project.remove_member!(collaborator.id)
        end
        fail!(nil)
      end
    rescue Exception => exception
      fail!(exception.message)
    end

    private
    attr_reader :owner, :project, :collaborator

    def fail!(error)
      @error = error
    end

  end
end
