class ZipsController < ApplicationController
  before_action :require_login, :check_auth
  before_action :load_homework, only: [:shixun_report]
  before_action :get_exercise, only: [:export_exercises]

  before_action :require_admin_or_teacher

  def shixun_report
    service = BatchExportShixunReportService.new(@homework, @all_student_works)
    filename_ = filename_for_content_disposition(service.filename)
    if params[:export].present? && params[:export]
      normal_status(0,"正在下载中")
    else
      set_export_cookies
      send_file service.zip, filename: filename_, type: 'application/zip'
    end

  rescue BatchExportShixunReportService::Error => ex
    normal_status(-1, ex.message)
  end

  def export_exercises
    @request_url = request.base_url
    exercises = ExportExercisesService.new(@exercise,@ex_users,@request_url)

    file_name_ = filename_for_content_disposition(exercises.filename)
    if params[:export].present? && params[:export]
      normal_status(0,"正在下载中")
    else
      set_export_cookies
      send_file exercises.ex_zip, filename: file_name_, type: 'application/zip'
    end
  rescue Exception => e
    normal_status(-1, e.message)
  end

  private

  def filename_for_content_disposition(name)
    request.env['HTTP_USER_AGENT'] =~ %r{MSIE|Trident|Edge} ? ERB::Util.url_encode(name) : name
  end

  def require_admin_or_teacher
    return if current_user.teacher_or_admin?(@course)
    normal_status(403, '')
  end

  def get_exercise
    ActiveRecord::Base.transaction do
      begin
        @exercise = Exercise.includes(:exercise_users,:exercise_questions).find_by(id:params[:exercise_id])
        @exercise_status = @exercise.present? ? @exercise.get_exercise_status(current_user) : 1
        group_id = params[:exercise_group_id]
        if @exercise.blank?
          normal_status(-1,"试卷不存在")
        elsif @exercise_status == 1
          normal_status(-1,"试卷未发布")
        else
          @course = @exercise.course
          default_ex_users = @exercise.all_exercise_users(current_user.id).exercise_user_committed
          @ex_users =  default_ex_users   #仅导出已提交的，截止后则是全部为提交的。

          #是否评阅
          if params[:review].present?
            review_type = params[:review].first.to_i  #已评，则数据为1，未评，则数据为0,前端传过来的为数组
            if review_type == 1
              @ex_users = @ex_users.where("subjective_score >= ?",0.0)
            else
              @ex_users = @ex_users.where("subjective_score < ?",0.0)
            end
          end

          #答题状态的选择
          if params[:commit_status].present? && (params[:commit_status].to_i == 1)
            @exercise_users_list =  @exercise_users_list.where(commit_status:params[:commit_status])
          elsif params[:commit_status].present? && (params[:commit_status].to_i == 0)
            normal_status(-1,"暂无用户提交！")
          end

          #可以分班选择
          if group_id.present?
            exercise_students = @course.students.where(course_group_id: group_id)  # 试卷所分班的全部人数
            user_ids = exercise_students.pluck(:user_id).reject(&:blank?).uniq
            @ex_users = @ex_users.where(user_id: user_ids)
          end

          #搜索
          if params[:search].present?
            @ex_users = @ex_users.joins(user: :user_extension).where("CONCAT(lastname, firstname) like ? OR nickname like ? OR student_id like ?", "%#{params[:search]}%", "%#{params[:search]}%", "%#{params[:search]}%")
          end

          default_ex_users_size = @ex_users&.size

          if default_ex_users_size.blank? || default_ex_users_size == 0
            normal_status(-1,"暂无用户提交")
          elsif default_ex_users_size > 100
            normal_status(-2,"100")
          end
        end
      rescue Exception => e
        uid_logger_error(e.message)
        tip_exception("导出失败！")
      end
    end
  end

  def load_homework
    @homework = HomeworkCommon.find(params[:homework_common_id])
    @homework_status = @homework.present? ?  @homework.homework_detail_manual.comment_status : 0
    if @homework.blank?
      normal_status(-1,"该作业不存在")
    elsif @homework_status == 0
      normal_status(-1,"该作业未发布")
    else
      @course   = @homework.course
      ##7。2 -hs新增
      @member = @course.course_member(current_user.id)

      @all_student_works = @homework.teacher_works(@member).where("work_status > 0")
      work_status = params[:work_status]
      group_id = params[:course_group]

      unless work_status.blank?
        @all_student_works = @all_student_works.where(work_status:work_status)
      end

      unless group_id.blank?
        group_user_ids = @course.students.where(course_group_id: params[:course_group]).pluck(:user_id)
        @all_student_works = @all_student_works.where(user_id: group_user_ids)
      end

      unless params[:search].blank?
        @all_student_works = @all_student_works.joins(user: :user_extension).where("CONCAT(lastname, firstname) like ? or nickname like ? 
                         or student_id like ?", "%#{params[:search]}%", "%#{params[:search]}%", "%#{params[:search]}%")
      end

      student_work_sizes = @all_student_works&.size
      if student_work_sizes.blank? || student_work_sizes == 0
        normal_status(-1,"暂无用户提交")
      elsif student_work_sizes > 100
        normal_status(-2,"100")
      end
    end
  end
end
