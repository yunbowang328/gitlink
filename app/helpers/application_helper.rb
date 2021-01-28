# 所有的方法请按首字母的顺序依次列出
module ApplicationHelper
  include Educoder::I18n
  include GitHelper

  ONE_MINUTE = 60 * 1000
  ONE_HOUR = 60 * ONE_MINUTE
  ONE_DAY = 24 * ONE_HOUR
  ONE_MONTH = 30 * ONE_DAY

  ONE_YEAR = 12 * ONE_MONTH

  # 全局参数配置
  def edu_setting name
    EduSetting.get(name)
  end

  # xss共计问题
  def content_safe content
    tags = %w(
        a abbr b bdo blockquote br caption cite code col colgroup dd del dfn dl
        dt em figcaption figure h1 h2 h3 h4 h5 h6 hgroup i img ins kbd li mark
        ol p pre q rp rt ruby s samp small strike strong sub sup table tbody td
        tfoot th thead time tr u ul var wbr div span
        )
    attributes = %w(href src width height alt cite datetime title class name xml:lang abbr style)
    sanitize content, tags: tags, attributes: attributes
  end

  def graduation_navigation graduation
    graduation.class.to_s == "GraduationTopic" ? "毕设选题" : "毕设任务"
  end

  def graduation_navigation_id course
    course.course_modules.find_by(module_type: "graduation").try(:id)
  end

  # 是否关注
  # from_user_id为被关注的用户
  def follow?(from_user_id, user_id)
    Watcher.where(watchable_type: 'Principal', watchable_id: from_user_id, user_id: user_id).exists?
  end

  # git用户
  # git用户命名规则：login+"@educoder.net"
  def git_username(email)
    User.find_by_mail(email) || User.find_by_login(email.split("@").first)
  end

  # 不同的类型扩展不同的目录
  def relative_path
    "avatars"
  end

  def replace_bytes_to_b(size_string)
    return size_string.gsub("Bytes", "B").gsub("bytes", "B").gsub("字节", "B")
  end

  def storage_path
    File.join(Rails.root, "public", "images", relative_path)
  end

  # 推荐实训
  def recommend_shixun(shixun)
    tag_repertoire_id = shixun.tag_repertoires.first.present? ? shixun.tag_repertoires.first.try(:id) : 0
    shixun_id = ShixunTagRepertoire.where("tag_repertoire_id = #{tag_repertoire_id} and
                                           shixun_id != #{shixun.id}").pluck(:shixun_id)

    shixun_id = shixun_id.blank? ? -1 : shixun_id.join(",")
    Shixun.select([:id, :name, :user_id, :challenges_count, :myshixuns_count, :trainee, :identifier]).where("id
                   in(#{shixun_id})").unhidden.publiced.order("homepage_show asc, myshixuns_count desc").limit(3)

  end

  # shixun开启挑战对应的行为名及url
  def task_operation_url current_myshixun, shixun
    if current_myshixun.blank?
      name = shixun.status == 0 ? "模拟实战" : "开启挑战"
      url = "/shixuns/#{shixun.identifier}/shixun_exec"
    else
      identifier = current_myshixun.current_task(current_myshixun.games).try(:identifier)
      if current_myshixun.status == 1
        name = "查看实战"
      else
        name = "继续挑战"
      end
      url = identifier
    end
    [name, url]
  end

  # 获取当前时间
  def time_from_now(time)
    if String === time
      time = Time.parse(time)
    end

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

  # 计算到结束还有多长时间 **天**小时**分
  def how_much_time(time)
    if time.nil? || time < Time.now   #6.21 -hs 增加小于time.now
      ''
    else
      result = ((time - Time.now.to_i).to_i / (24*60*60)).to_s + " 天 "
      result += (((time - Time.now.to_i).to_i % (24*60*60)) / (60*60)).to_s + " 小时 "
      result + ((((time - Time.now.to_i).to_i % (24*60*60)) % (60*60)) / 60).to_s + " 分 "
    end
  end

  def format_time(time)
    time.present? ? time.strftime("%Y-%m-%d %H:%M") : ''
  end

  # 用户图像url，如果不存在的话，source为匿名用户，即默认使用匿名用户图像
  def url_to_avatar(source)
    return "" if source&.id.blank?
    if File.exist?(disk_filename(source&.class, source&.id))
      ctime = File.ctime(disk_filename(source.class, source.id)).to_i
      if source.class.to_s == 'User'
        File.join(relative_path, ["#{source.class}", "#{source.id}"]) + "?t=#{ctime}"
      else
        File.join("images/avatars", ["#{source.class}", "#{source.id}"]) + "?t=#{ctime}"
      end
    elsif source.class.to_s == 'User'
      str = source.user_extension.try(:gender).to_i == 0 ? "b" : "g"
      File.join(relative_path, "#{source.class}", str)
    elsif source.class.to_s == 'Subject'
      File.join("images","educoder", "index", "subject", "subject#{rand(17)}.jpg")
    elsif source.class.to_s == 'Shixun'
      File.join("images","educoder", "index", "shixun", "shixun#{rand(23)}.jpg")
    end
  end

  # 主页banner图
  def banner_img(source_type)
    if File.exist?(disk_filename(source_type, "banner"))
      ctime = File.ctime(disk_filename(source_type, "banner")).to_i
      File.join("images/avatars", ["#{source_type}", "banner"]) + "?t=#{ctime}"
    end
  end

  def disk_filename(source_type,source_id,image_file=nil)
    File.join(storage_path, "#{source_type}", "#{source_id}")
  end

  def disk_auth_filename(source_type, source_id, type)
    File.join(storage_path, "#{source_type}", "#{source_id}#{type}")
  end

  def disk_real_name_auth_filename(source_id)
    disk_auth_filename('UserAuthentication', source_id, 'ID')
  end

  def auth_file_url(source_type, source_id, type)
    File.join('/images', relative_path, source_type, "#{source_id}#{type}")
  end

  def real_name_auth_file_url(source_id)
    auth_file_url('UserAuthentication', source_id, 'ID')
  end

  def disk_professional_auth_filename(source_id)
    disk_auth_filename('UserAuthentication', source_id, 'PRO')
  end

  def professional_auth_file_url(source_id)
    auth_file_url('UserAuthentication', source_id, 'PRO')
  end

  def shixun_url_to_avatar(shixun)
    if File.exist?(disk_filename(shixun.class, shixun.id))
      File.join("images/#{relative_path}", "#{shixun.class}", "#{shixun.id}")
    else
      File.join("educoder", "index", "shixun", "shixun#{rand(23)}.jpg")
    end
  end

  # 选用实训的学校情况
  def school_user_detail shixun
    user_ids = shixun.myshixuns.map(&:user_id).uniq # 走缓存取数据
    school_ids = UserExtension.where(user_id:user_ids).pluck(:school_id).uniq
    school_names = School.where(id: school_ids[0..1]).pluck(:name)
    school_size = school_ids.size
    str = school_size > 0 ? "#{school_names.join("、")}等 #{school_size}所" : "0所"
  end

  # 普通/分组 作业作品状态数组
  def student_work_status homework, user_id, course, work
    status = []
    homework_setting = homework.homework_group_setting user_id, true
    work = work || StudentWork.create(homework_common_id: homework.id, user_id: user_id)
    late_time = homework.late_time || course.end_date

    if course.is_end && work && work.work_status > 0
      status << "查看作品"
    elsif !course.is_end
      if homework_setting.publish_time && homework_setting.publish_time < Time.now
        # 作业未截止时
        if homework_setting.end_time > Time.now
          if homework.homework_type == "group" && homework.homework_detail_group.base_on_project
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
        elsif homework.allow_late && (late_time.nil? || late_time > Time.now)
          if homework.homework_type == "group" && homework.homework_detail_group.base_on_project
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
          if homework.homework_detail_manual.comment_status == 3
            work_ids = homework.student_works.has_committed.pluck(:id)
            if StudentWorksEvaluationDistribution.where(student_work_id: work_ids, user_id: user_id).size > 0
              status << "匿评作品"
            end
          end
          status << "查看作品"
        end
      end
    end
  end

  def commit_des_status work, homework
    status = []
    homework_setting = homework.homework_group_setting work.user_id

    # 作业已发布且作业未截止（补交未截止）且提交了作品才能提交或修改总结
    if homework_setting.publish_time && homework_setting.publish_time < Time.now && work.work_status > 0  &&
        ((homework_setting.end_time && homework_setting.end_time > Time.now) ||
          (homework.allow_late && homework.late_time && homework.late_time > Time.now))
        work.description.present? ? status << "修改总结" : status << "提交总结"
    end
  end

  def download_url attachment,options={}
    attachment_path(attachment,options)
  end

  # 耗时：天、小时、分、秒
  # 小于1分钟则不显示
  def game_spend_time time
    day = time / 86400
    hour = time % (24*60*60) / (60*60)
    min = time % (24*60*60) % (60*60) / 60
    sec = time % (24*60*60) % (60*60) % 60
    if day < 1
      if hour < 1
        if min < 1
          if sec < 1
            time = "--"
          else
            time = "#{sec}秒"
          end
        else
          time = "#{min}分钟 #{sec}秒"
        end
      else
        time = "#{hour}小时 #{min}分钟 #{sec}秒"
      end
    else
      time = "#{day}天 #{hour}小时 #{min}分钟 #{sec}秒"
    end
    return time
  end

  def absolute_path(file_path)
    file_root_directory + File.join(edu_setting('attachment_folder'), file_path)
  end

  def file_root_directory
    Rails.root.to_s
  end

  def file_storage_directory
    file_root_directory + edu_setting('attachment_folder')
  end

  def local_path(file)
    File.join(file.disk_directory, file.disk_filename)
  end

  def update_downloads(file)
    file.update_attributes(:downloads => file.downloads + 1)
  end

  # 项目信息,
  def project_info work, current_user, course_identity
    project = work.project
    if project
      if project.status == 9
        {id: -1, name: "#{project.name}(已删除)", title: "该项目已删除", author: project.creator, member_count: project.project_members.count}
      else
        project_score = project.project_score
        if project.is_public || current_user.manager_of_project?(project) || course_identity < Course::STUDENT
          {id: project.id, name: project.name, author: project.creator, member_count: project.project_members.count,
           all_score: project_score.all_score, code_score: project_score.code_score, issue_score: project_score.issue_score,
           attachment_score: project_score.attachment_score, message_score: project_score.message_score}
        else
          {id: -1, name: "#{project.name}", title: "该项目是私有的", author: project.creator, member_count: project.project_members.count,
           all_score: project_score.all_score, code_score: project_score.code_score, issue_score: project_score.issue_score,
           attachment_score: project_score.attachment_score, message_score: project_score.message_score}
        end
      end
    else
      {id: -1, name: "--", title: "--"}
    end
  end

  def message_content(content)
    content = (strip_html content).strip
    content = content.gsub(/\s+/, " ")
    if content.gsub(" ", "") == ""
      content = "[非文本消息]"
    end
    content
  end

  def strip_html(text, len=0, endss="...")
    ss = ""
    if !text.nil? && text.length>0
      ss=text.gsub(/<\/?.*?>/, '').strip
      ss = ss.gsub(/&nbsp;*/, '')
      ss = ss.gsub(/\r\n/,'')  #新增
      ss = ss.gsub(/\n/,'')  #新增
      if len > 0 && ss.length > len
        ss = ss[0, len] + endss
      elsif len > 0 && ss.length <= len
        ss = ss
        #ss = truncate(ss, :length => len)
      end
    end
    ss
  end

  def strip_export_title(content)
    con_ = ""
    if content.length > 0
      con_ = strip_tags(content)
      con_ = con_.gsub(/\r\n/,'').gsub(/&nbsp;*/, '').strip
    end
    con_
  end

  def pdf_load_sources(*arg)
    arr = arg.map do |path|
      content_tag(:script) do
        File.open(Rails.root.join('public', path)).read.to_s.html_safe
      end
    end

    raw arr.join('')
  end



  # 导出pdf时，转化markdown为html
  def to_markdown(text,origin_url)
    return nil if text.blank?
    options = {
        :autolink => true,
        :no_intra_emphasis => true,
        :fenced_code_blocks => true,
        :lax_html_blocks => true,
        :strikethrough => true,
        :superscript => false,
        :tables => true
    }
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, options)
    m_t = markdown.render(text)
    m_t&.include?("src=\"") ? m_t&.gsub("src=\"","src=\"#{origin_url}") : m_t
  end

  def shixun_status_class(shixun)
    case shixun.status
    when 0 then 'text-info'
    when 1 then 'text-warning'
    when 2 then 'text-success'
    when 3 then 'text-secondary'
    end
  end

  def render_unix_time(date)
    date.to_time.to_i
  end

  def find_user_by_login(login)
    User.find_by_login login
  end
end
