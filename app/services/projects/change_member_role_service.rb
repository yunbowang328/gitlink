class Projects::ChangeMemberRoleService < ApplicationService
  attr_reader :project, :user_id, :role

  def initialize(project, user_id, role)
    @project  = project
    @user_id  = user_id
    @role     = role
  end

  def call
    ActiveRecord::Base.transaction do
      tmp_role = Role.find_by_name role
      @project.change_member_role!(user_id, tmp_role)
    end
  rescue => e
    raise Error, e.message
  end
end
