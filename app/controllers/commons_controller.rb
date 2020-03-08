class CommonsController < ApplicationController
  OBJECT_TYPE = %W[message journals_for_message]

  before_action :require_login, :check_auth
  before_action :validate_object_type
  before_action :find_object
  before_action :validate_power

  def delete
    begin
      @object.destroy!
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  def hidden
    action(true)
  end

  def unhidden
    action(false)
  end

  private
  def find_object
    begin
      @object = params[:object_type].strip.classify.constantize.find params[:object_id]
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      return
    end
  end

  def validate_object_type
    return normal_status(2, "缺少object_id参数") if params[:object_id].blank?
    return normal_status(2, "缺少object_type参数") if params[:object_type].blank?
    return normal_status(2, "object_type参数格式错误") unless OBJECT_TYPE.include? params[:object_type].strip
  end

  def validate_power
    code =
      case params[:object_type].strip
      when 'message'
        if current_user.course_identity(@object.board.course) >= Course::STUDENT && @object.author != current_user
          403
        else
          200
        end
      when 'journals_for_message'
        course = @object&.jour_type.to_s == "StudentWorksScore" ? @object.jour&.student_work&.homework_common&.course : @object.jour&.course
        if current_user.course_identity(course)  >= Course::STUDENT && @object.user != current_user
          403
        else
          200
        end
      else
        current_user.admin_or_business? ? 200 : 403
      end
    return normal_status(code, "你没有权限操作！") if code == 403
  end

  def action(flag)
    begin
      @object.has_attribute?(:is_hidden) ? @object.update_attributes(:is_hidden => flag )
          : @object.update_attributes(:hidden => flag )
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end
end
