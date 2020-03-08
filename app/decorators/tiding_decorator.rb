module TidingDecorator
  def content
    method_name = "#{container_type.underscore}_content"
    respond_to?(method_name) ? send(method_name) : ''
  rescue => ex
    Util.logger_error(ex)
    ''
  end

  def how_long_time
    time_from_now(created_at)
  end

  def unread?(time)
    created_at > time
  end

  # 组装国际化路径：locale_format('Apply', 1) ==> tiding.ApplyUserAuthentication.Apply.1_end
  def locale_format(*arr)
    arr.unshift("tiding.#{container_type}").join('.') << '_end'
  end

  def message_content_helper(msg)
    msg = (strip_html msg).strip
    msg = msg.gsub(/\s+/, ' ')
    if msg.gsub(' ', '') == ''
      msg = "[非文本消息]"
    end
    msg
  end

  def strip_html(text, len = 0, suffix = "...")
    text = text.to_s
    str = ""
    if !text.nil? && text.length > 0
      str = text.gsub(/<\/?.*?>/, '').strip
      str = str.gsub(/&nbsp;*/, ' ')

      if len > 0 && str.length > len
        str = str[0, len] + suffix
      elsif len > 0 && str.length <= len
        str = str
      end
    end
    str
  end

  # ================ 各种类消息内容方法 ================
  def apply_user_authentication_content
    t_user = trigger_user || User.find(1)

    if tiding_type == 'Apply'
      str1, str2 =  if container.auth_type == 1
                      [t_user.show_real_name, t_user.ID_number]
                    elsif container.auth_type == 2
                      ue = t_user.user_extension
                      [[ue.school&.name, ue.department&.name].join('_'), ue.identity_text]
                    end
      I18n.t(locale_format(tiding_type, container.auth_type)) % [str1, str2]
    elsif tiding_type == 'System'
      I18n.t(locale_format(tiding_type, "#{container.auth_type}_#{status}"), reason: container.try(:remarks))
    end
  end

  def cancel_user_authentication_content
    I18n.t(locale_format) % [user.show_real_name, user.ID_number]
  end

  def cancel_user_pro_certification_content
    ue = user.user_extension
    I18n.t(locale_format) % [[ue.school&.name, ue.department&.name].join('_'), ue.identity_text]
  end

  def join_course_content
    I18n.t(locale_format(extra)) % Course.find_by(id: container_id)&.name
  end

  def deal_course_content
    name = Course.find_by(id: container_id)&.name
    I18n.t(locale_format("#{extra}_#{status}")) % name
  end

  def student_join_course_content
    I18n.t(locale_format) % [trigger_user.show_real_name, Course.find_by(id: container_id)&.name]
  end

  def teacher_join_course_content
    name = Course.find_by(id: container_id)&.name
    I18n.t(locale_format extra) % [trigger_user&.show_real_name, name]
  end

  def apply_add_department_content
    name = container.name
    second_name = School.find_by_id(container.school_id).try(:name)
    if tiding_type == 'Apply'
      I18n.t(locale_format(tiding_type)) % [name, second_name]
    elsif status == 2
      I18n.t(locale_format(tiding_type, "#{status}_#{extra.nil?}"), reason: extra) % [name, second_name]
    else
      I18n.t(locale_format(tiding_type, status), reason: extra) % [name, second_name]
    end
  end

  def apply_add_schools_content
    name = ApplyAddSchool.find_by(id: container_id)&.name
    if tiding_type == 'Apply'
      I18n.t(locale_format(tiding_type)) % name
    elsif status == 2
      I18n.t(locale_format(tiding_type, "#{status}_#{extra.nil?}"), name: name, reason: extra)
    else
      I18n.t(locale_format(tiding_type, status), name: name, reason: extra)
    end
  end

  def apply_action_content
    name = case parent_container_type
           when 'ApplyShixun'        then Shixun.find_by(id: parent_container_id)&.name
           when 'ApplySubject'       then Subject.find_by(id: parent_container_id)&.name
           when 'TrialAuthorization' then nil
           end

    if tiding_type == 'System'
      I18n.t(locale_format(parent_container_type, tiding_type, status), name: name, reason: container.try(:reason))
    elsif tiding_type == 'Apply'
      I18n.t(locale_format(parent_container_type, tiding_type), name: name)
    end
  end

  def course_content
    if tiding_type == 'Delete'
      I18n.t(locale_format(tiding_type)) % extra
    else
      I18n.t(locale_format) % container.name
    end
  end

  def delete_course_content
    I18n.t(locale_format) % belong_container.name
  end

  def delete_course_member_content
    name = Course.find_by(id: container_id)&.name
    I18n.t(locale_format) % [trigger_user&.show_real_name, name]
  end

  def shixun_content
    I18n.t(locale_format) % container.name
  end

  def subject_content
    I18n.t(locale_format) % container.name
  end

  def archive_course_content
    I18n.t(locale_format) % Course.find_by(id: container_id)&.name
  end

  def journals_for_message_content
    format_str =
      if tiding_type == 'Mentioned'
        locale_format(tiding_type)
      elsif parent_container_type == 'Principal'
        if container.m_parent_id.present?
          locale_format(parent_container_type, "#{container.m_parent_id.present?}_#{container.parent.try(:m_parent_id).present?}")
        else
          locale_format(parent_container_type, "#{container.m_parent_id.present?}_#{container.private.zero?}")
        end
      else
        locale_format(parent_container_type, container.m_parent_id.present?)
      end

    I18n.t(format_str) % message_content_helper(container.notes)
  end

  def message_content
    if tiding_type == 'Mentioned'
      I18n.t(locale_format(tiding_type)) % message_content_helper(container.content)
    elsif container.parent.present?
      format_str = locale_format("#{true}_#{container.parent_id == container.root_id}")
      I18n.t(format_str) % message_content_helper(container.content)
    else
      I18n.t(locale_format(false)) % message_content_helper(container.subject)
    end
  end

  def memo_content
    if tiding_type == 'Mentioned'
      I18n.t(locale_format(tiding_type)) % message_content_helper(container.content)
    elsif container.parent.present?
      format_str = locale_format("#{true}_#{container.parent_id == container.root_id}")
      I18n.t(format_str) % message_content_helper(container.content)
    else
      I18n.t(locale_format(false)) % message_content_helper(container.subject)
    end
  end

  def watcher_content
    I18n.t(locale_format)
  end

  def praise_tread_content
    case parent_container_type
    when 'Challenge' then
      if container
        format_str = I18n.t(locale_format(parent_container_type, container.praise_or_tread))
        format_str % [parent_container.shixun.name, parent_container.position]
      end
    when 'Memo', 'Message' then
      message = parent_container.parent_id.present? ? message_content_helper(parent_container.content) : parent_container.subject
      I18n.t(locale_format(parent_container_type, parent_container.parent_id.present?)) % message
    when 'HomeworkCommon' then
      I18n.t(locale_format(parent_container_type)) % parent_container.name
    when 'JournalsForMessage' then
      i18n_url = locale_format(parent_container_type, parent_container.jour_type == 'Principal' && parent_container.m_parent_id.blank?)
      I18n.t(i18n_url) % message_content_helper(parent_container.notes)
    when 'Discuss' then
      I18n.t(locale_format(parent_container_type)) % message_content_helper(parent_container.content)
    when 'Issue' then
      I18n.t(locale_format(parent_container_type)) % parent_container.subject
    when 'Journal' then
      message = parent_container&.notes.present? ? '：' + message_content_helper(parent_container.notes) : ''
      I18n.t(locale_format(parent_container_type)) % message
    when 'Hack' then
      I18n.t(locale_format(parent_container_type)) % parent_container.name
    end
  end

  def discuss_content
    I18n.t(locale_format(parent_container_type, container.parent_id.present?)) %
        (parent_container_type == 'Hack' ? container.content : message_content_helper(container.content))
  end

  def grade_content
    case parent_container_type
    when 'Answer' then
      game = Game.find_by(id: parent_container_id)
      if game.present?
        format_str = I18n.t(locale_format(parent_container_type, true))
        format_str % [game.challenge.shixun.name, game.challenge.position, container.score]
      else
        # 之所以这样处理，是因为消息的类型是不能和实体绑定，没有关联删除
        I18n.t(locale_format(parent_container_type, false)) % container.score
      end
    when 'Game' then
      game = Game.find_by(id: parent_container_id)
      if game.present?
        format_str = I18n.t(locale_format(parent_container_type))
        format_str % [game.challenge.shixun.name, game.challenge.position, container.score]
      end
    when 'testSet' then
      position = Game.find_by(id: parent_container_id)&.challenge&.position || '--'
      I18n.t(locale_format(parent_container_type)) % [position, container.score]
    when 'shixunPublish' then
      name = Shixun.find_by(id: parent_container_id)&.name || '---'
      I18n.t(locale_format(parent_container_type)) % [name, container.score]
    when 'Hack' then
      name = Hack.find_by(id: container_id)&.name || '---'
      I18n.t(locale_format(parent_container_type)) % [name, container.score]
    else
      I18n.t(locale_format(parent_container_type)) % container.score
    end
  end

  def join_project_content
    project = Project.find_by(id: container_id)
    I18n.t(locale_format(extra)) % project.name
  end

  def deal_project_content
    project = Project.find_by(id: container_id)
    I18n.t(locale_format("#{extra}_#{status}")) % project.name
  end

  def manager_join_project_content
    project = Project.find_by(id: container_id)
    I18n.t(locale_format(extra)) % [trigger_user&.show_real_name, project.name]
  end

  def reporter_join_project_content
    project = Project.find_by(id: container_id)
    I18n.t(locale_format) % project.name
  end

  def journal_content
    case tiding_type
    when 'Mentioned' then
      I18n.t(locale_format(tiding_type)) % message_content_helper(container&.notes)
    when 'Comment' then
      I18n.t(locale_format(tiding_type, container.parent.present?)) % message_content_helper(container&.notes)
    else
      I18n.t(locale_format) % container&.issue&.subject
    end
  end

  def issue_content
    I18n.t(locale_format) % container&.subject
  end

  def pull_request_content
    if tiding_type == 'Apply'
      I18n.t(locale_format(tiding_type)) % container.try(:title)
    else
      I18n.t(locale_format(status)) % container.try(:title)
    end
  end

  def send_message_content
    data = (JSON.parse(extra) rescue extra)
    if data.is_a?(String)
      I18n.t(locale_format('old')) % extra
    else
      I18n.t(locale_format('new')) % [data['language'], data['runtime'], data['run_method']]
    end
  end

  def poll_content
    I18n.t(locale_format(parent_container_type)) % container&.polls_name
  end

  def exercise_content
    I18n.t(locale_format(parent_container_type)) % container&.exercise_name
  end

  def live_link_content
    I18n.t(locale_format) % container&.course_name
  end

  def student_graduation_topic_content
    I18n.t(locale_format) % container&.graduation_topic.try(:name)
  end

  def deal_student_topic_select_content
    I18n.t(locale_format(status)) % GraduationTopic.find_by(id: parent_container_id).try(:name)
  end

  def graduation_task_content
    I18n.t(locale_format(parent_container_type)) % container&.name
  end

  def graduation_work_content
    I18n.t(locale_format(extra.nil?)) % container&.graduation_task.try(:name)
  end

  def graduation_work_score_content
    I18n.t(locale_format) % container&.graduation_work&.graduation_task.try(:name)
  end

  def homework_common_content
    I18n.t(locale_format(parent_container_type), name: container&.name, reason: extra)
  end

  def student_work_content
    I18n.t(locale_format) % container&.homework_common.try(:name)
  end

  def resubmit_student_work_content
    I18n.t(locale_format) % parent_container.try(:name)
  end

  def student_works_score_content
    I18n.t(locale_format(extra)) % container&.student_work&.homework_common.try(:name)
  end

  def adjust_score_content
    I18n.t(locale_format) % parent_container.try(:name)
  end

  def challenge_work_score_content
    I18n.t(locale_format) % container&.comment
  end

  def student_works_scores_appeal_content
    work = StudentWork.find_by(id: parent_container_id)
    name = work&.homework_common&.name

    if parent_container_type == 'StudentWork'
      I18n.t(locale_format(parent_container_type, tiding_type)) % name
    else
      I18n.t(locale_format(parent_container_type, status)) % name
    end
  end

  def department_content
    I18n.t(locale_format) % [container.try(:name), container.try(:school)&.name]
  end

  def library_content
    if tiding_type == 'System'
      I18n.t(locale_format(tiding_type, status), reason: extra) % container.try(:title)
    else
      I18n.t(locale_format(tiding_type)) % container.try(:title)
    end
  end

  def project_package_content
    if tiding_type == 'System'
      I18n.t(locale_format(tiding_type, status), reason: extra) % container.try(:title)
    else
      I18n.t(locale_format(tiding_type)) % [container.try(:title) || extra]
    end
  end

  def video_content
    if tiding_type == 'System'
      I18n.t(locale_format(tiding_type, status), reason: extra) % container.try(:title)
    else
      I18n.t(locale_format(tiding_type)) % [container.try(:title) || extra]
    end
  end

  def public_course_start_content
    I18n.t(locale_format) % [belong_container&.name, belong_container&.start_date&.strftime("%Y-%m-%d")]
  end

  def subject_start_course_content
    I18n.t(locale_format) % belong_container&.name
  end

  def hack_content
    I18n.t(locale_format(parent_container_type)) % (container&.name || extra)
  end
end
