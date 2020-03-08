class Users::BanksController < Users::BaseController
  before_action :params_filter
  def index
    order = params[:order] || "updated_at"
    sort = params[:sort] || "desc"
    @banks = @object_type.classify.constantize.where(@object_filter)
    @course_lists = CourseList.where(id: @banks.pluck(:course_list_id))
    @banks = @banks.where(course_list_id: params[:tag_id]) unless params[:tag_id].blank?
    @banks = @banks.order("#{order} #{sort}")
    @banks_count = @banks.size
  end

  private

  def params_filter
    type = ["normal", "group", "poll", "exercise", "gtask", "gtopic"]
    tip_exception("object_type类型不正确") unless type.include?(params[:object_type])
    # HomeworkBank 普通、分组作业题库；ExerciseBank试卷、问卷题库；GtaskBank毕设选题题库；GtopicBank毕设任务题库；
    case params[:object_type]
    when 'normal'
      @object_type = "HomeworkBank"
      @object_filter = "homework_type = 1" # 普通作业
    when 'group'
      @object_type = "HomeworkBank"
      @object_filter = "homework_type = 3" # 分组作业
    when 'poll'
      @object_type = "ExerciseBank"
      @object_filter = "container_type = 'Poll'" # 问卷
    when 'exercise'
      @object_type = "ExerciseBank"
      @object_filter = "container_type = 'Exercise'" # 试卷
    when 'gtask'
      @object_type = "GtaskBank"
      @object_filter = nil
    when 'gtopic'
      @object_type = "GtopicBank"
      @object_filter = nil
    end
  end
end
