class Projects::JoinService < ApplicationService
  attr_reader :project, :user, :opts

  def initialize(project, user, **opts)
    @project = project
    @user    = user
    @opts    = opts
  end

  def call
    ActiveRecord::Base.transaction do
      member = project.members.create!(user: user)

      member.member_roles.create!(role_id: role_value)

      # project.user_grades.find_or_create_by!(user: user)
    end

    ApplyJoinProjectNotifyJob.perform_later(user, project, role_value)

    project
  end

  private

  def role_value
    @_role ||=
      case opts[:role]
      when 'manager'   then 3
      when 'developer' then 4
      when 'reporter'  then 5
      else raise ArgumentError
      end
  end
end