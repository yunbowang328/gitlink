class Weapps::HomeworkCommonsController < Weapps::BaseController
  before_action :require_login
  before_action :find_homework, :user_course_identity
  before_action :teacher_allowed

  def update_settings
    begin
      # 课堂结束后不能再更新
      unless @course.is_end
        UpdateHomeworkPublishSettingService.call(@homework, publish_params)
        render_ok
      else
        tip_exception("课堂已结束不能再更新")
      end
    rescue Exception => e
      uid_logger(e.backtrace)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  private

  def teacher_allowed
    return render_forbidden unless @user_course_identity < Course::STUDENT
  end

  def find_homework
    @homework = HomeworkCommon.find_by!(id: params[:id])
    @course = @homework.course
    @homework_detail_manual = @homework.homework_detail_manual
  end

  def publish_params
    params.permit(:unified_setting, :publish_time, :end_time, group_settings: [:publish_time, :end_time, group_id: []])
  end

end