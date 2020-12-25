module ProtectedBranches
  class UpdateService < ProtectedBranches::BaseService
    def call
      validate!
      protected_branch.update(protected_branch_params) if success?

      protected_branch

		rescue ActiveRecord::RecordNotFound
      raise Error, '404'
    rescue => ex
      Rails.logger.info ex
      raise Error, ex
    end

    private
      def protected_branch
        @protected_branch ||= @repository.protected_branches.find_by!(branch_name: params[:branch_name])
      end

      def success?
        result = Gitea::Repository::ProtectedBranches::UpdateService.call(@owner.login, @repository.identifier,
          protected_branch.branch_name, gitea_protected_branch_params, @owner.gitea_token)


        return true if result[:status] === :success
        raise Error, result[:message]
      end

  end
end
