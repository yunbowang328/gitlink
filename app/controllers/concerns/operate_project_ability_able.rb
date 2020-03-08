module OperateProjectAbilityAble
  extend ActiveSupport::Concern

  included do
  end

  def authorizate_user_can_edit_project!
    return if current_user.project_manager? @project || current_user.admin?
    render_forbidden('你没有权限操作.')
  end

end
