module CoursesHelper

  def member_manager group, teachers
    str = ""
    members = teachers.select{|teacher| teacher.teacher_course_groups.pluck(:course_group_id).include?(group.id) || teacher.teacher_course_groups.size == 0}
    str = members.uniq.size == teachers.size ? "全部教师" : members.map{|member| member.user.real_name}.join("、")
    str
    # teachers.each do |member|
    #   if member.teacher_course_groups.exists?(course_group_id: group.id) || member.teacher_course_groups.size == 0
    #     str << member.user.real_name
    #   end
    # end
  end

  def edit_auth group, teachers
    User.current.admin_or_business? ||
      teachers.select{|teacher| teacher.user_id == User.current.id &&
        (teacher.teacher_course_groups.pluck(:course_group_id).include?(group.id) || teacher.teacher_course_groups.size == 0)}.size > 0
  end

    # 是否有切换为学生的入口
  def switch_student_role is_teacher, course, user
    is_teacher && course.course_members.where(user_id: user.id, role: %i(STUDENT)).exists?
  end

  # 是否有切换为教师的入口
  def switch_teacher_role is_student, course, user
    is_student && course.course_members.where(user_id: user.id, role: %i(CREATOR PROFESSOR)).exists?
  end

  # 是否有切换为助教的入口
  def switch_assistant_role is_student, course, user
    is_student && course.course_members.where(user_id: user.id, role: %i(ASSISTANT_PROFESSOR)).exists?
  end

  # 课堂结束天数
  def course_end_date end_date
    if end_date.present?
      curr = Time.new
      date = ((Date.parse(end_date.to_s) - Date.parse(curr.to_s)).to_i)
      date > 0 ? "#{date}天后" : ""
    end
  end

  # 课堂模块的url
  def module_url mod, course
    return nil if mod.blank? or course.blank?
    case mod.module_type
    when "announcement"
      "/courses/#{course.id}/informs"
    when "online_learning"
      "/courses/#{course.id}/online_learning"
    when "shixun_homework"
      "/courses/#{course.id}/shixun_homeworks/#{mod.id}"
    when "common_homework"
      "/courses/#{course.id}/common_homeworks/#{mod.id}"
    when "group_homework"
      "/courses/#{course.id}/group_homeworks/#{mod.id}"
    when "graduation"
      "/courses/#{course.id}/graduation_topics/#{mod.id}"
    when "exercise"
      "/courses/#{course.id}/exercises/#{mod.id}"
    when "poll"
      "/courses/#{course.id}/polls/#{mod.id}"
    when "attachment"
      "/courses/#{course.id}/files/#{mod.id}"
    when "board"
      course_board = course.course_board
      "/courses/#{course.id}/boards/#{course_board.id}"
    when "course_group"
      "/courses/#{course.id}/course_groups"
    when "statistics"
      "/courses/#{course.id}/statistics"
    when "video"
      "/courses/#{course.id}/course_videos"
    end
  end

  # 子目录对应的url
  def category_url category, course
    case category.category_type
      when "shixun_homework"
        "/courses/#{course.id}/shixun_homework/#{category.id}"
      when "graduation"
        if category.name == "毕设选题"
          "/courses/#{course.id}/graduation_topics/#{category.course_module_id}"
        else
          "/courses/#{course.id}/graduation_tasks/#{category.course_module_id}"
        end
      when "attachment"
        "/courses/#{course.id}/file/#{category.id}"
    end
  end

  # 子目录下的任务数
  def category_task_count course, category, user
    case category.category_type
    when "shixun_homework"
      get_homework_commons_count(course, 4, category.id)
    when "graduation"
      if category.name == "毕设选题"
        course.graduation_topics_count
      else
        course.graduation_tasks_count
      end
    when "attachment"
      get_attachment_count(course, category.id)
    end
  end

  # 课堂模块的任务数
  def course_task_count(course, module_type)
    case module_type
      when "shixun_homework"
        get_homework_commons_count(course, 4, 0)
      when "common_homework"
        get_homework_commons_count(course, 1, 0)
      when "group_homework"
        get_homework_commons_count(course, 3, 0)
      when "graduation"
        0
      when "exercise"
        course.exercises_count
      when "poll"
        course.polls_count
      when "attachment"
        get_attachment_count(course, 0)
      when "board"
        course_board = course.course_board
        course_board.present? ? course_board.messages.size : 0
      when "course_group"
        course.course_groups_count
      when "announcement"
        course.informs.count
      when "online_learning"
        course.shixuns.count
      when "video"
        course.course_videos.count + course.live_links.count
    end
  end

  # 当前用户可见的课堂作业，type指定作业类型， category_id指定二级目录
  def visible_homework course, user, type, category_id=0
    if user.teacher_of_course?(course)
      homeworks = course.homework_commons.where("homework_type = #{type} and course_second_category_id = #{category_id}")
    elsif user.member_of_course?(course)
      member = course.course_members.find_by(user_id: user.id, role: 4)
      if member.try(:course_group_id).to_i == 0
        homeworks = course.homework_commons.where("homework_commons.homework_type = #{type} and publish_time <= '#{Time.now}'
                                                   and unified_setting = 1 and course_second_category_id = #{category_id}")
      else
        not_homework_ids = course.homework_group_settings.where("course_group_id = #{member.try(:course_group_id)} and
                                                                 (publish_time > '#{Time.now}' or publish_time is null)").pluck(:homework_common_id)
        # not_homework_ids = not_homework_ids.blank? ? "(-1)" : "(" + not_homework_ids.map(&:homework_common_id).join(",") + ")"
        homeworks = course.homework_commons.where.not(id: not_homework_ids).where("homework_commons.homework_type = #{type} and publish_time <= '#{Time.now}'
                                                   and course_second_category_id = #{category_id}")
      end
    else
      homeworks = course.homework_commons.where("homework_type = #{type} and publish_time <= '#{Time.now}' and unified_setting = 1
                                                 and course_second_category_id = #{category_id}")
    end
    homeworks
  end

  # 当前用户可见的课堂试卷
  def visible_exercise course, user
    if user.teacher_of_course?(course)
      exercises = course.exercises
    elsif user.member_of_course?(course)
      member = course.course_members.find_by(user_id: user.id, role: 4)
      if member.try(:course_group_id).to_i == 0
        exercises = course.exercises.where("publish_time <= '#{Time.now}' and unified_setting = 1")
      else
        not_exercise_ids = course.exercise_group_settings.where("course_group_id = #{member.try(:course_group_id)} and
                                                                 (publish_time > '#{Time.now}' or publish_time is null)").pluck(:exercise_id)
        exercises = course.exercises.where.not(id: not_exercise_ids).where("publish_time <= '#{Time.now}'")
      end
    else
      exercises = course.exercises.where("publish_time <= '#{Time.now}' and unified_setting = 1")
    end
    exercises
  end

  # 当前用户可见的课堂问卷
  def visible_poll course, user
    if user.teacher_of_course?(course)
      polls = course.polls
    elsif user.member_of_course?(course)
      member = course.course_members.find_by(user_id: user.id, role: 4)
      if member.try(:course_group_id).to_i == 0
        polls = course.polls.where("publish_time <= '#{Time.now}' and unified_setting = 1")
      else
        not_poll_ids = course.poll_group_settings.where("course_group_id = #{member.try(:course_group_id)} and
                                                                 (publish_time > '#{Time.now}' or publish_time is null)").pluck(:poll_id)
        polls = course.polls.where.not(id: not_poll_ids).where("publish_time <= '#{Time.now}'")
      end
    else
      polls = course.polls.where("publish_time <= '#{Time.now}' and unified_setting = 1")
    end
    polls
  end

  # 当前用户可见的课堂资源，category_id指定资源的目录
  def visible_attachment course, user, category_id=0
    result = []
    course.attachments.where(course_second_category_id: category_id).each do |attachment|
      if attachment.unified_setting
        if attachment.is_public == 1 && attachment.is_publish == 1 || user == attachment.author || user.teacher_of_course?(course) || (user.member_of_course?(course) && attachment.is_publish == 1)
          result << attachment
        end
      else
        if attachment.is_public == 1 && attachment.is_publish == 1 && !user.member_of_course?(course) || user == attachment.author || user.teacher_of_course?(course)
          result << attachment
        elsif user.member_of_course?(course) && attachment.is_publish == 1
          member = course.course_members.find_by(user_id: user.id, role: 4)
          if member.try(:course_group_id).to_i == 0 && attachment.unified_setting
            result << attachment
          elsif attachment.attachment_group_settings.where("course_group_id = #{member.try(:course_group_id)} and publish_time > '#{Time.now}'").count == 0
            result << attachment
          end
        end
      end
    end
    result
  end

  # 获取课堂的资源数
  def get_attachment_count(course, category_id)
    category_id.to_i == 0 ? course.attachments.size : course.attachments.where(course_second_category_id: category_id).size
  end

  # 获取课堂的作业数
  def get_homework_commons_count(course, type, category_id)
    category_id == 0 ? HomeworkCommon.where(course_id: course.id, homework_type: type).size :
      HomeworkCommon.where(course_id: course.id, homework_type: type, course_second_category_id: category_id).size
  end


  # 获取课堂的任务数(作业数＋试卷数＋问卷数)
  def get_tasks_count(course)
    course.homework_commons_count + course.exercises_count + course.polls_count
  end

  # 当前用户可见的毕设任务
  def visible_graduation_task course, user
    if user.teacher_of_course?(course)
      tasks = course.graduation_tasks
    else
      tasks = course.graduation_tasks.where("publish_time <= '#{Time.now}'")
    end
    tasks
  end

  # 分班情况
  def course_group_info course, user_id
    course_group_ids = course.group_course_power(user_id)
    course_groups =
        if course_group_ids.present?
          course.course_groups.where(id: course_group_ids).includes(:course_members)
        else
          course.course_groups.includes(:course_members)
        end
    group_info = []
    if !course_groups.blank?
      course_groups.each do |group|
        group_info << {course_group_id: group.id, group_group_name: group.name, count: group.course_members_count}
      end

      none_group_count = course.students.where(course_group_id: 0).size
      group_info << {course_group_id: 0, group_group_name: "未分班", count: none_group_count} if none_group_count > 0 && !course_group_ids.present?
    end

    return group_info
  end

  def left_group_info course
    group_info = []
    if course.course_groups_count > 0
      none_group_count = course.students.where(course_group_id: 0).size
      group_info << {category_id: 0, category_name: "未分班", position: course.course_groups.pluck(:position).max.to_i + 1,
                     category_count: none_group_count, category_type: false,
                     second_category_url: "/courses/#{@course.id}/course_groups/0"}
      course.course_groups.each do |course_group|
        group_info << {category_id: course_group.id, category_name: course_group.name, position: course_group.position,
                       category_count: course_group.course_members_count, category_type: false,
                       second_category_url: "/courses/#{@course.id}/course_groups/#{course_group.id}"}
      end
    end
    group_info
  end

  def last_subject_shixun course, myshixuns
    myshixun = myshixuns.sort{|x,y| y[:updated_at] <=> x[:updated_at] }.first
    return "" unless myshixun
    stage_shixun = course.course_stage_shixuns.where(shixun_id: myshixun.shixun_id).take
    progress = stage_shixun&.course_stage&.position.to_s + "-" + stage_shixun&.position.to_s + " " + myshixun.shixun&.name
  end
end
