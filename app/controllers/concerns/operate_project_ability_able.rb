module OperateProjectAbilityAble
  extend ActiveSupport::Concern

  included do
  end

  def authorizate_user_can_edit_project!
    return if @project.manager?(current_user) || current_user.admin?
    render_forbidden('你没有权限操作.')
  end

end
