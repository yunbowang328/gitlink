module ProtectedBranches
  class CreateService < ProtectedBranches::BaseService
    def call
      validate!

      ProtectedBranch.transaction do
        save_gitea_protected_branch!
        save_protected_branch!
      end

      protected_branch
    end

    private
      def protected_branch
        @protected_branch ||= repository.protected_branches.new(protected_branch_params)
      end

      def save_protected_branch!
        protected_branch.save
      end

      def save_gitea_protected_branch!
        @gitea_protected_branch ||= Gitea::Repository::ProtectedBranches::CreateService.call(@owner.login,
          @repository.identifier, gitea_protected_branch_params, @owner.gitea_token)

        raise Error, @gitea_protected_branch[:message] unless gitea_protected_branch_saved?(@gitea_protected_branch)
      end

  end
end
