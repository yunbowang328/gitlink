module ProtectedBranches
  class CreateService < ProtectedBranches::BaseService
    def call
      validate!

      save_gitea_protected_branch!

      save_protected_branch!

      protected_branch
    end

    private
      def protected_branch
        @protected_branch ||= repository.protected_branches.new(protected_branch_params)
      end

      def save_protected_branch!
        protected_branch.save
      end
  end
end
