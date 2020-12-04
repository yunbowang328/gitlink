module ProtectedBranches
  class EditService < ProtectedBranches::BaseService
    def call
      validate_branch_name!

      protected_branch
    rescue => ex
      Rails.logger.info ex
      raise Error, ex
    end

    private
      def protected_branch
        branch = get_common_branch
        protected_branch ||= @repository.protected_branches.find_by(branch_name: branch_name)
        [branch, protected_branch]
      end

      def get_common_branch
        result = Gitea::Repository::Branches::GetService.call(@owner.login,
          @repository.identifier, branch_name, @owner.gitea_token)

        raise Error, '404' if result[:status] == :error
        result
      end

      def validate_branch_name!
        raise Error, '分支名称不能为空' if branch_name.blank?
      end

      def branch_name
        params
      end
  end
end
