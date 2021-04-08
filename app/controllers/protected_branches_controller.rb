class ProtectedBranchesController < ApplicationController
  include OperateProjectAbilityAble

  before_action :require_login
  before_action :load_repository
  before_action :authorizate_user_can_edit_project!

  def index
    scope = @repository.protected_branches
    @total_count = scope.size
    @protected_branches = paginate(scope)
  end

  def create
    @protected_branch = ProtectedBranches::CreateService.call(@repository, @owner, params)

    render_protected_branch_json
  end

  def update
    @protected_branch = ProtectedBranches::UpdateService.call(@repository, @owner, params)
  end

  def destroy
    ProtectedBranches::DestroyService.call(@repository, @owner, params[:branch_name])

    render_ok
  end

  def show
    @protected_branch = ProtectedBranches::GetService.call(@repository, @owner, params)
  end

  def edit
    @branch, @protected_branch = ProtectedBranches::EditService.call(@repository, @owner, params[:branch_name])
  end

  private
    def render_protected_branch_json
      @protected_branch.persisted? ? @protected_branch : render_error('创建失败!')
    end

end
