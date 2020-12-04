module ProtectedBranches
  class GetService < ProtectedBranches::BaseService
    def call
      validate_branch_name!

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

      def validate_branch_name!
        raise Error, '分支名称不能为空' if params[:branch_name].blank?
      end
  end
end
