class Projects::BaseController < ApplicationController
  include PaginateHelper

  before_action :load_project
  before_action :load_repository

  def require_manager!
    return render_forbidden('你没有权限操作') unless current_user.admin? || @project.manager?(current_user)
  end
end
