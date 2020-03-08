module GraduationTasksHelper
  include CoursesHelper
  # 教师评阅
  def teacher_comment task, user_id
    [{ id: 0 ,name: "未评", count: task.uncomment_count(user_id)}, {id: 1, name: "已评", count: task.comment_count(user_id)}]
  end

  # 作品状态
  def task_status task, user_id
    [{id: 0, name: "未提交",   count: task.unfinished_count(user_id)},
     {id: 1, name: "按时提交", count: task.finished_count(user_id)},
     {id: 2, name: "延时提交", count: task.delay_finished_count(user_id)}]
  end

  # 交叉评阅
  def cross_comment task, user_id
    if task.cross_comment && task.status >= 3
      [{id: 1, name: "只看我的交叉评阅", count: task.graduation_work_comment_assignations.myself(user_id).count}]
    else
      []
    end
  end

  def task_curr_status task, course
    result = {}
    status = []
    time = ""

    if course.try(:is_end)
      status << "已结束"
      time = course.end_date.present? ? course.end_date.strftime("%Y-%m-%d") : ""
    else
      if task.status > 1 && task.allow_late && (task.late_time.nil? || task.late_time > Time.now)
        status << "补交中"
      end

      case task.status
        when 0
          status << "未发布"
          time = task.publish_time.present? ? "将于 #{format_time(task.publish_time)} 发布" : "创建于#{time_from_now(task.created_at)}"
        when 1
          if task.end_time && task.end_time >= Time.now
            status << "提交中"
            time = how_much_time(task.end_time)
          end
        when 2
          status << "评阅中"
          time = task.comment_time.present? ? how_much_time(task.comment_time) : course.end_date.present? ? how_much_time(course.end_date.end_of_day) : ""
        when 3
          status << "交叉评阅中"
          time = course.end_date.present? ? how_much_time(course.end_date.end_of_day) : ""
      end

      status << "未开启补交" if (!task.allow_late && task.status != 0)    #6.11 -hs 新增status不等于0

      # 如果还在补交阶段则显示补交结束时间
      if task.status > 1 && task.allow_late && task.late_time && task.late_time > Time.now
        time = how_much_time(task.late_time)
      end
    end

    result[:status] = status
    result[:time] = time
    result
  end

  # 作品数统计：type： 1 已提交  0 未提交
  def grduationwork_count task, type
   works = task.graduation_works
   type == 1 ? works.select{|work| work.work_status != 0}.size : works.select{|work| work.work_status == 0}.size
  end

  # 普通/分组 作业作品状态数组
  def graduation_work_status task, user_id, course
    status = []
    work = task.graduation_works.find_by(user_id: user_id)

    work = work || GraduationWork.create(graduation_task_id: task.id, user_id: user_id)
    late_time = task.late_time || course.end_date

    if course.is_end && work && work.work_status > 0
      status << "查看作品"
    elsif !course.is_end
      if task.publish_time && task.publish_time < Time.now
        # 作业未截止时
        if task.end_time > Time.now
          if task.task_type == 2 && task.base_on_project
            if work.project_id.nil? || work.project_id == 0
              status << "创建项目"
              status << "关联项目"
            elsif work.work_status == 0
              status << "取消关联"
              status << "提交作品"
            else
              status << "修改作品"
            end
          else
            if work.work_status == 0
              status << "提交作品"
            else
              status << "修改作品"
            end
          end

          # 补交阶段
        elsif task.allow_late && (late_time.nil? || late_time > Time.now)
          if task.task_type == 2 && task.base_on_project
            if work.project_id.nil? || work.project_id == 0
              status << "创建项目"
              status << "关联项目"
            elsif work.work_status == 0
              status << "取消关联"
              status << "补交作品"
            else
              status << "补交附件"
              status << "查看作品"
            end
          else
            if work.work_status == 0
              status << "补交作品"
            else
              status << "补交附件"
              status << "查看作品"
            end
          end

          # 匿评阶段
        elsif work.work_status != 0
          status << "查看作品"
        end
      end
    end
  end

  # 阶段剩余时间
  def task_left_time task
    if task.publish_time && task.publish_time < Time.now
      if task.end_time > Time.now
        status = "剩余提交时间"
        time = "#{how_much_time(task.end_time)}"
      else
        if task.allow_late && task.late_time && task.late_time >= Time.now
          status = "剩余补交时间"
          time = "#{how_much_time(task.late_time)}"
        end
      end
    end
    {status: status, time: time}
  end
end
