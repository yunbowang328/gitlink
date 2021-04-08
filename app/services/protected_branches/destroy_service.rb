module ProtectedBranches
  class DestroyService < ProtectedBranches::BaseService
    def call
      protected_branch.destroy! if success?
		rescue ActiveRecord::RecordNotFound
      raise Error, '404'
    rescue => ex
      Rails.logger.info ex
      raise Error, ex
    end

    private
      def protected_branch
        @protected_branch ||= @repository.protected_branches.find_by!(branch_name: @params)
      end

      def success?
        result = Gitea::Repository::ProtectedBranches::DestroyService.call(@owner.login,
          @repository.identifier, protected_branch.branch_name, @owner.gitea_token)

        return true if result[:status] === :success
        raise Error, result[:message]
      end

  end
end
