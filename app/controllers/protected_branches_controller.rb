class ProtectedBranchesController < ApplicationController
  before_action :require_login
  before_action :load_repository

  def index
    scope = ProtectedBranch.all
    @total_count = scope.size
    @protected_branches = paginate(scope)
  end

  def create
    @protected_branch = ProtectedBranches::CreateService.call(@repository, @owner, params)
  end

  def update
    @protected_branch = ProtectedBranches::UpdateService.call(@repository, @owner, params)
  end

  def destroy
    ProtectedBranches::DestroyService.call(@repository, @owner, params[:branch_name])

    render_ok
  end

  private
    def render_protected_branch_json
      if @protected_branch.persisted?
        render json: Jbuilder.new { |json| json.extract! @protected_branch, :can_push  }.target!
      else
        render_error('创建失败!')
      end
    end

end
