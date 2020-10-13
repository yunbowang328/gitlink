# encoding: utf-8
module ApiHelper
  ONE_MINUTE = 60 * 1000
  ONE_HOUR = 60 * ONE_MINUTE
  ONE_DAY = 24 * ONE_HOUR
  ONE_MONTH = 30 * ONE_DAY

  ONE_YEAR = 12 * ONE_MONTH
  #获取用户的工作单位
  def get_user_work_unit user
    work_unit = ""
    if user.user_extensions.identity == 0 || user.user_extensions.identity == 1
      work_unit = user.user_extensions.school.name unless  user.user_extensions.school.nil?
    elsif  user.user_extensions.identity == 3
      work_unit = user.user_extensions.occupation
    elsif user.user_extensions.identity == 2
      work_unit = user.firstname
    end
    work_unit
  end

  #获取用户地区
  def get_user_location user
    location = ""
    location << (user.user_extensions.location || '')
    location << (user.user_extensions.location_city || '')
    location
  end

  def get_user_realname user
    name = user.lastname + user.firstname
    name.empty? || name.nil? || name == " " ? user.login : name
  end

  def get_assigned_homeworks(homeworks, n, index)
    homeworks += homeworks
    homeworks[index + 1 .. index + n]
  end


  def stars_to_json_like starts,show_jour,homework,show_real_name
    result = []
    starts.each do |s|
      comment = get_homework_review homework,show_jour,s.rater
      rater_name = show_real_name ? s.rater.login : l(:label_anonymous)
      rater_id = show_real_name ? s.rater.id : ''
      result << {:rater_id =>rater_id ,:rater_name => rater_name,:created_at => format_time(s.created_at),:stars => s.stars,:comment => comment}
    end
    result
  end

  #########################################################
  #sw
  #获取课程未匿评数量
  #param: user => "用户", course_id => "查询的课程ID"
  #return: 作业的数量
  #########################################################
  def get_course_anonymous_evaluation user,course
    count = 0
    if course
      is_teacher = is_course_teacher user,course
      if is_teacher #如果是老师，显示学生提交的作业数
        course.homeworks.each do |bid|
          count += bid.homeworks.count
        end
      else #如果是学生，显示未匿评的数量
        course.homeworks.each do |bid|
          count += get_student_not_batch_homework_list bid,user
        end
      end
    end
    [count,is_teacher]
  end

  def get_user_language user
    (user.language.nil? || user.language == "") ? 'zh':user.language
  end

  # 学生获取课程作业的状态
  def get_homework_status homework
    homework_status = ""
       if homework
         if  homework.homework_type == 1 && homework.homework_detail_manual
           case homework.homework_detail_manual.comment_status
             when 1
               homework_status = show_homework_deadline homework
             when 2
               homework_status = "正在匿评"
             when 3
               homework_status = "匿评结束"
           end
         elsif homework.homework_type == 0
           homework_status = "未启用匿评"
         elsif homework.homework_type == 2
           homework_status = "编程作业"
         else
         end
       end
    homework_status
  end

  #获取作业的是否可以匿评的描述
  def homework_status_desc homework
    if homework.homework_type == 1 && homework.homework_detail_manual #匿评作业
      if homework.end_time >= Time.now
        link = show_homework_deadline homework
      elsif homework.student_works.count >= 2 #作业份数大于2
        case homework.homework_detail_manual.comment_status
          when 1
            link =  '启动匿评'
          when 2
            link =  '关闭匿评'
          when 3
            link = " 匿评结束"
        end
      else
        link = "提交作业数过少"
      end
    else
      link = "未开启匿评作业"
    end
    link
  end

  #获取
  def get_submit_sutdent_list homework
    studentlist = []
    if homework.is_a?(Hash) && homework.key?(:studentlist)
      studentlist = homework[:studentlist]
    else
      homework.student_works.order("created_at desc").page(1).per(6).each do |work|
            studentlist << work.user
      end
    end
    studentlist
  end

  #计算作业的截止日期，剩余日期
  def show_homework_deadline homework
   day = 0
    if (day = (Date.parse(homework.end_time.to_s) - Date.parse(Time.now.to_s)).to_i) > 0
      "距作业截止还有" << day.to_s << "天"
    else
      "已截止，但可补交"
    end
  end

  #获取作业中学生的匿评比率
  # 匿评比率 = 学生总共评价的作业的作业份数  /  作业份数 * 分配数 * 100%
  # 教辅匿评比率 = 教辅已经评价的作业份数 / 总的作业份数 * 100%
  def get_evaluation_part homework,role
    homework_eva_completed_task_num = 0
    homework_eva_task_num = 0
    #匿评作业 # 且匿评状态不是还没有开启匿评
    if homework.homework_type == 1 && homework.homework_detail_manual &&  homework.homework_detail_manual.comment_status != 1
      # 总共需要评价的任务数
      homework_eva_task_num = homework.homework_detail_manual.evaluation_num * homework.student_works.count
      unless homework_eva_task_num == 0 #总任务数不为0 的情况下
        #获取已经评价了多少的份作业  student_work_score里记录了评价情况，每条记录有提交作业的id
        #先求出提交作业的id集合
        work_ids = "(" + homework.student_works.map(&:id).join(",") + ")"
        #只要 student_work_score 中的 student_work_id在work_ids集合中，那么久说明这个任务被完成了

        sql = "select count(1) from student_works_scores where reviewer_role = #{role} and  student_work_id in #{work_ids} "
        homework_eva_completed_task_num = ActiveRecord::Base.connection().select_value(sql)
      end
    end
    if homework_eva_task_num == 0
      0
    else
     ( homework_eva_completed_task_num /  homework_eva_task_num.to_f * 100 ) .round(1)
    end

  end

  # 获取当前时间
  def time_from_now time
    lastUpdateTime = time.to_i*1000

    currentTime = Time.now.to_i*1000
    timePassed = currentTime - lastUpdateTime
    timeIntoFormat = 0
    updateAtValue = ""
    if timePassed < 0
        updateAtValue = "刚刚"
    elsif timePassed < ONE_MINUTE
        updateAtValue = "1分钟前"
    elsif timePassed < ONE_HOUR
        timeIntoFormat = timePassed / ONE_MINUTE
        updateAtValue = timeIntoFormat.to_s + "分钟前"
    elsif (timePassed < ONE_DAY)
        timeIntoFormat = timePassed / ONE_HOUR
        updateAtValue = timeIntoFormat.to_s + "小时前"
    elsif (timePassed < ONE_MONTH)
        timeIntoFormat = timePassed / ONE_DAY
        updateAtValue = timeIntoFormat.to_s + "天前"
    elsif (timePassed < ONE_YEAR)
        timeIntoFormat = timePassed / ONE_MONTH
        updateAtValue = timeIntoFormat.to_s + "个月前"
    else
        timeIntoFormat = timePassed / ONE_YEAR
        updateAtValue = timeIntoFormat.to_s + "年前"
    end
    updateAtValue

  end

  # 获取当前时间
  def time_from_future time
    lastUpdateTime = time.to_i*1000

    currentTime = Time.now.to_i*1000
    timePassed = lastUpdateTime - currentTime;
    timeIntoFormat = 0
    updateAtValue = ""
    if timePassed < 0
      updateAtValue = "马上"
    elsif timePassed < ONE_MINUTE
      updateAtValue = "1分钟"
    elsif timePassed < ONE_HOUR
      timeIntoFormat = timePassed / ONE_MINUTE
      updateAtValue = timeIntoFormat.to_s + "分钟"
    elsif (timePassed < ONE_DAY)
      timeIntoFormat = timePassed / ONE_HOUR
      updateAtValue = timeIntoFormat.to_s + "小时"
    elsif (timePassed < ONE_MONTH)
      timeIntoFormat = timePassed / ONE_DAY
      updateAtValue = timeIntoFormat.to_s + "天"
    elsif (timePassed < ONE_YEAR)
      timeIntoFormat = timePassed / ONE_MONTH
      updateAtValue = timeIntoFormat.to_s + "个月"
    else
      timeIntoFormat = timePassed / ONE_YEAR
      updateAtValue = timeIntoFormat.to_s + "年"
    end
    updateAtValue
  end

  # 计算到结束还有多长时间 **天**小时**分
  def how_much_time time
    result = ""
    result = ((time - Time.now.to_i).to_i / (24*60*60)).to_s + " 天 "
    result += (((time - Time.now.to_i).to_i % (24*60*60)) / (60*60)).to_s + " 小时 "
    result += ((((time - Time.now.to_i).to_i % (24*60*60)) % (60*60)) / 60).to_s + " 分 "
  end

  #日期转换为时间
  def convert_to_time date, num
    if num == 0
      date = date.to_s + " 00:00"
    elsif num == 1
      date = date.to_s + " 23:59"
    end
    return date
  end

  #获取用户
  def get_user user_id
    user = User.find user_id
    user
  end

  #获取项目
  def get_project project_id
    project = Project.find project_id
    project
  end

  #获取课程
  def get_course course_id
    course = Course.find course_id
    course
  end

  #获取点赞数
  def get_activity_praise_num(object)
    obj_type = object.class
    obj_id = object.id
    record = PraiseTreadCache.find_by_object_id_and_object_type(obj_id,obj_type)
    if record
      return ((record.praise_num.nil? ? 0 : record.praise_num.to_i)-(record.tread_num.nil? ? 0 : record.tread_num.to_i))
    else
      return 0
    end
  end

  #获取缺陷的优先级
  def get_issue_priority_api value
    issuetype = ""
    if value == 4
      issuetype = "紧急"
    elsif value == 2
      issuetype = "正常"
    elsif value == 3
      issuetype = "高"
    elsif value == 1
      issuetype = "低"
    else
      issuetype = "立刻"
    end
  end

  def jdetails_to_strings(details, no_html=false, options={})
    options[:only_path] = (options[:only_path] == false ? false : true)
    options[:token] = options[:token] if options[:token]
    strings = []
    values_by_field = {}
    details.each do |detail|

      if detail.property == 'cf'
        field_id = detail.prop_key
        field = CustomField.find_by_id(field_id)
        if field && field.multiple?
          values_by_field[field_id] ||= {:added => [], :deleted => []}
          if detail.old_value
            values_by_field[field_id][:deleted] << detail.old_value
          end
          if detail.value
            values_by_field[field_id][:added] << detail.value
          end
          next
        end
      end
      strings << jshow_detail(detail, no_html, options)

    end
    values_by_field.each do |field_id, changes|
      detail = JournalDetail.new(:property => 'cf', :prop_key => field_id)
      if changes[:added].any?
        detail.value = changes[:added]
        strings << jshow_detail(detail, no_html, options)
      elsif changes[:deleted].any?
        detail.old_value = changes[:deleted]
        strings << jshow_detail(detail, no_html, options)
      end
    end
    strings
  end

  # Returns the textual representation of a single journal detail
  def jshow_detail(detail, no_html=false, options={})
    multiple = false
    case detail.property
      when 'attr'
        field = detail.prop_key.to_s.gsub(/\_id$/, "")
        label = l(("field_" + field).to_sym)
        case detail.prop_key
          when 'due_date', 'start_date'
            value = format_date(detail.value.to_date) if detail.value
            old_value = format_date(detail.old_value.to_date) if detail.old_value

          when 'project_id', 'status_id', 'tracker_id', 'assigned_to_id',
              'priority_id', 'category_id', 'fixed_version_id'
            value = find_name_by_reflection(field, detail.value)
            old_value = find_name_by_reflection(field, detail.old_value)

          when 'estimated_hours'
            value = "%0.02f" % detail.value.to_f unless detail.value.blank?
            old_value = "%0.02f" % detail.old_value.to_f unless detail.old_value.blank?

          when 'parent_id'
            label = l(:field_parent_issue)
            value = "##{detail.value}" unless detail.value.blank?
            old_value = "##{detail.old_value}" unless detail.old_value.blank?

          when 'is_private'
            value = l(detail.value == "0" ? :general_text_No : :general_text_Yes) unless detail.value.blank?
            old_value = l(detail.old_value == "0" ? :general_text_No : :general_text_Yes) unless detail.old_value.blank?
        end
      when 'cf'
        custom_field = CustomField.find_by_id(detail.prop_key)
        if custom_field
          multiple = custom_field.multiple?
          label = custom_field.name
          value = format_value(detail.value, custom_field.field_format) if detail.value
          old_value = format_value(detail.old_value, custom_field.field_format) if detail.old_value
        end
      when 'attachment'
        label = l(:label_attachment)
    end
    call_hook(:helper_issues_show_detail_after_setting,
              {:detail => detail, :label => label, :value => value, :old_value => old_value })

    label ||= detail.prop_key
    value ||= detail.value
    old_value ||= detail.old_value

    unless no_html
      label = content_tag('strong', label)
      old_value = content_tag("i", old_value) if detail.old_value
      old_value = content_tag("del", old_value) if detail.old_value and detail.value.blank?
      if detail.property == 'attachment' && !value.blank? && atta = Attachment.find_by_id(detail.prop_key)
        # Link to the attachment if it has not been removed
        if options[:token].nil?
          value = atta.filename
        else
          value = atta.filename
        end
        # 放大镜搜索功能
        # if options[:only_path] != false && atta.is_text?
        #   value += link_to(
        #                image_tag('magnifier.png'),
        #                :controller => 'attachments', :action => 'show',
        #                :id => atta, :filename => atta.filename
        #              )
        # end
      else
        value = content_tag("i", value) if value
      end
    end
    # 缺陷更新结果在消息中显示样式
    if no_html == "message"
      label = content_tag(:span, label, :class => "issue_update_message")
      old_value = content_tag("span", old_value) if detail.old_value
      old_value = content_tag("del", old_value) if detail.old_value and detail.value.blank?
      if detail.property == 'attachment' && !value.blank? && atta = Attachment.find_by_id(detail.prop_key)
        # Link to the attachment if it has not been removed
        if options[:token].nil?
          value = atta.filename
        else
          value = atta.filename
        end
      else
        value = content_tag(:span, value, :class => "issue_update_message_value") if value
      end
    end

    if detail.property == 'attr' && detail.prop_key == 'description'
      s = l(:text_journal_changed_no_detail, :label => label)
      unless no_html
        diff_link = link_to l(:label_diff),
                            {:controller => 'journals', :action => 'diff', :id => detail.journal_id,
                             :detail_id => detail.id, :only_path => options[:only_path]},
                            :title => l(:label_view_diff)
        s << " (#{ diff_link })"
      end
      s.html_safe
    elsif detail.value.present?
      case detail.property
        when 'attr', 'cf'
          if detail.old_value.present?
            l(:text_journal_changed, :label => label, :old => old_value, :new => value).html_safe
          elsif multiple
            l(:text_journal_added, :label => label, :value => value).html_safe
          else
            l(:text_journal_set_to, :label => label, :value => value).html_safe
          end
        when 'attachment'
          l(:text_journal_added, :label => label, :value => value).html_safe
      end
    else
      l(:text_journal_deleted, :label => label, :old => old_value).html_safe
    end
  end

  #课程动态的更新
  def update_course_activity_api type, id
    course_activity = CourseActivity.where("course_act_type=? and course_act_id =?", type.to_s, id.to_i).first
    if course_activity
      course_activity.updated_at = Time.now
      course_activity.save
    end
  end
  #首页动态更新
  def update_user_activity_api type, id
    user_activity = UserActivity.where("act_type=? and act_id =?", type.to_s, id.to_i).first
    if user_activity
      user_activity.updated_at = Time.now
      user_activity.save
    end
  end
  #项目动态更新
  def update_forge_activity_api type, id
    forge_activity = ForgeActivity.where("forge_act_type=? and forge_act_id=?", type.to_s, id.to_i).first
    if forge_activity
      forge_activity.updated_at = Time.now
      forge_activity.save
    end
  end
  #组织动态更新
  def update_org_activity_api type , id
    org_activity = OrgActivity.where("org_act_type=? and org_act_id =?", type.to_s, id.to_i).first
    if org_activity
      org_activity.updated_at = Time.now
      org_activity.save
    end
  end
  #个人动态更新
  def update_principal_activity_api type, id
    principal_activity = PrincipalActivity.where("principal_act_type=? and principal_act_id =?", type.to_s, id.to_i).first
    if principal_activity
      principal_activity.updated_at = Time.now
      principal_activity.save
    end
  end

  #赞/取消赞
  def praise_or_cancel(type,id,user,flag)
    unless id.nil? and type.nil?
      #首先创建或更新praise_tread 表
      pt = PraiseTread.new
      pt.user_id = user.id
      pt.praise_tread_object_id = id.to_i
      pt.praise_tread_object_type = type
      pt.praise_or_tread = flag
      pt.save
      # end

      #再创建或更新praise_tread_cache表
      #@ptc = PraiseTreadCache.find_by_object_id_and_object_type(id,type)
      ptc = PraiseTreadCache.where("object_id = ? and object_type = ?",id.to_i,type).first
      ptc = ptc.nil? ? PraiseTreadCache.new : ptc
      ptc.object_id = id.to_i
      ptc.object_type = type
      ptc.save
      ptc.praise_plus(flag,1)
    end
  end

  def praise_plus(flag,num)
    case flag
      when 1
        self.update_attribute(:praise_num, self.praise_num.to_i + num)
    end
  end

  def praise_minus(num)
    self.update_attribute(:praise_num, self.praise_num.to_i - num)
  end


  class Errors
    def self.define_error(arr)
      @errors = {}
      arr.each_with_index { |item, index|
        if index %2 == 1
          @errors[arr[index-1]] = item
        end
      }
      if arr.count % 2== 1
        @default_error =  arr.last
      else
        @default_error =  "未知错误"
      end

    end

    def self.message(msg_id)
      @errors[msg_id] || @default_error
    end
  end

end