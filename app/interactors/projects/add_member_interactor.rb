module Projects
  class AddMemberInteractor
    def self.call(owner, project, collaborator, permission="write")
      interactor = new(owner, project, collaborator, permission)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(owner, project, collaborator, permission)
      @owner        = owner
      @project      = project
      @collaborator = collaborator
      @permission   = permission
    end

    def success?
      @error.nil?
    end

    def run
      ActiveRecord::Base.transaction do
        gitea_result = Gitea::Repository::Members::AddService.new(owner, project.identifier, collaborator.login, permission).call
        if gitea_result.status == 204
          project.add_member!(collaborator.id)
        end
        fail!(nil)
      end
    rescue Exception => exception
      fail!(exception.message)
    end

    private
    attr_reader :owner, :project, :collaborator, :permission

    def fail!(error)
      @error = error
    end

  end
end
