module Projects
  class ChangeMemberRoleInteractor
    def self.call(owner, project, collaborator, role)
      interactor = new(owner, project, collaborator, role)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(owner, project, collaborator, role)
      @owner        = owner
      @collaborator = collaborator
      @project      = project
      @role         = role
    end

    def success?
      @error.nil?
    end

    def run
      Projects::ChangeMemberRoleForm.new({user_id: collaborator.id, role: role}).validate!
      ActiveRecord::Base.transaction do
        gitea_result = Gitea::Repository::Members::AddService.new(owner, project.identifier, collaborator.login, treated_role).call
        if gitea_result.status == 204
          Projects::ChangeMemberRoleService.new(project, collaborator.id, role).call
          fail!(nil)
        end
      end
    rescue Exception => exception
      fail!(exception.message)
    end

    private
    attr_reader :role, :project, :collaborator, :owner

    def fail!(error)
      @error = error
    end

    def treated_role
      case role
      when "Manager" then "admin"
      when "Developer" then "write"
      when "Reporter" then "read"
      end
    end

  end
end
