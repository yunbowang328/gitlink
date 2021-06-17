class Projects::ApplyJoinService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call

    # 项目报告人员直接加入项目
    # if params[:role] == 'reporter'
    #   # Projects::JoinService.call(project, user, role: 'reporter')
    #   return project
    # end

    ActiveRecord::Base.transaction do
      validate!
      apply = user.applied_projects.create!(project: project, role: role_value)
      apply
      # apply.forge_activities.find_or_create_by!(user: user, project: project)

      # notify_project_manager!(apply)
    end

    # notify_project_owner
    # ApplyJoinProjectNotifyJob.perform_later(user.id, project.id, role_value)

  end

  private

  def project
    @_project ||= Project.find_by(invite_code: params[:code].to_s.strip)
  end

  def role_value
    @_role ||=
      case params[:role]
      when 'manager'   then 3
      when 'developer' then 4
      when 'reporter'  then 5
      else 
        5
      end
  end

  def notify_project_manager!(apply)
    columns = %i[user_id applied_id applied_type status viewed applied_user_id role project_id created_at updated_at]
    AppliedMessage.bulk_insert(*columns) do |worker|
      base_attr = {
        applied_id: apply.id, applied_type: 'AppliedProject', status: false, viewed: false,
        applied_user_id: user.id, role: role_value, project_id: project.id
      }

      project.managers.each do |manager|
        worker.add(base_attr.merge(user_id: manager.user_id))
      end
    end
  end

  def notify_project_owner
    owner = project.user
    return if owner.phone.blank?

    Educoder::Sms.send(mobile: owner.phone, send_type:'applied_project_info',
                       user_name: owner.show_name, name: project.name)
  rescue Exception => ex
    Rails.logger.error("发送短信失败 => #{ex.message}")
  end

  def validate!
    # params check
    raise Error, '邀请码不能为空' if params[:code].blank?
    raise Error, '请输入6位项目邀请码' unless valid_invite_code( params[:code])

    # logical check
    raise Error, '邀请码无效' if project.blank?
    raise Error, '您已是项目成员' if project.member?(user)
    raise Error, '您已经提交过申请' if user.applied_projects.common.exists?(project: project)
  end

  def valid_invite_code(str)
    if (str =~ /^[A-Za-z0-9]{6}+$/) 
      return true
    end
    return false
  end
end