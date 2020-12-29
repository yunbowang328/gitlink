module Projects
  class AddMemberInteractor
    def self.call(owner, project, collaborator, permission="write", is_apply_signature=false)
      interactor = new(owner, project, collaborator, permission, is_apply_signature)
      interactor.run
      interactor
    end

    attr_reader :error, :result

    def initialize(owner, project, collaborator, permission, is_apply_signature)
      @owner              = owner
      @project            = project
      @collaborator       = collaborator
      @permission         = permission
      @is_apply_signature = is_apply_signature
    end

    def success?
      @error.nil?
    end

    def run
      ActiveRecord::Base.transaction do
        gitea_result = Gitea::Repository::Members::AddService.new(owner, project.identifier, collaborator.login, permission).call
        if gitea_result.status == 204
          project.add_member!(collaborator.id, set_member_role, is_apply_signature)
        end
        fail!(nil)
      end
    rescue Exception => exception
      fail!(exception.message)
    end

    private
    attr_reader :owner, :project, :collaborator, :permission, :is_apply_signature

    def fail!(error)
      @error = error
    end

    def set_member_role
      @role ||=
        case @permission
        when "write" then "Developer"
        when "read" then "Reporter"
        else "Developer"
        end
    end

  end
end
