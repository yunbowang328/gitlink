class Course < ApplicationRecord
  include Searchable::Course

  has_many :boards, dependent: :destroy

  belongs_to :teacher, class_name: 'User', foreign_key: :tea_id  # 定义一个方法teacher，该方法通过tea_id来调用User表
  belongs_to :school, class_name: 'School', foreign_key: :school_id #定义一个方法school，该方法通过school_id来调用School表
  belongs_to :course_list, optional: true

  belongs_to :laboratory, optional: true

  # 所属实践课程
  belongs_to :subject, optional: true
  has_many :informs, as: :container, dependent: :destroy

  has_many :course_infos, dependent: :destroy
  # 课堂左侧导航栏的模块
  has_many :course_modules, dependent: :destroy
  has_many :none_hidden_course_modules, -> { not_hidden }, class_name: "CourseModule"
  has_many :board_course_modules, -> { board_module }, class_name: "CourseModule"
  has_many :attachment_course_modules, -> { attachment_module }, class_name: "CourseModule"
  has_many :common_course_modules, -> { common_homework_module }, class_name: "CourseModule"
  has_many :group_course_modules, -> { group_homework_module }, class_name: "CourseModule"
  has_many :shixun_course_modules, -> { shixun_homework_module }, class_name: "CourseModule"

  # 课堂模块的二级目录
  has_many :course_second_categories, dependent: :destroy
  # 课堂分班
  has_many :course_groups, dependent: :destroy
  # 答辩组
  has_many :graduation_groups, dependent: :destroy

  has_many :course_members, dependent: :destroy
  has_many :students, -> { course_students }, class_name: 'CourseMember'
  has_many :teacher_course_members, -> { teachers_and_admin }, class_name: 'CourseMember'
  has_many :teacher_users, through: :teacher_course_members, source: :user
  has_many :course_messages, dependent: :destroy

  has_many :homework_commons, dependent: :destroy
  has_many :normal_homeworks, -> { normals }, class_name: 'HomeworkCommon'
  has_many :group_homeworks, -> { groups }, class_name: 'HomeworkCommon'
  has_many :practice_homeworks, -> { practices }, class_name: 'HomeworkCommon'

  has_many :homework_group_settings
  has_many :graduation_works, dependent: :destroy

  # 实训作业的二级目录（已弃用）
  has_many :course_homework_categories, dependent: :destroy
  has_many :exercises, dependent: :destroy

  #课堂的试卷
  has_many :exercise_group_settings, :dependent => :destroy

  # 课堂的问卷
  has_many :polls, dependent: :destroy
  has_many :poll_group_settings, :dependent => :destroy

  # 毕业设计
  has_many :graduation_topics, dependent: :destroy
  has_many :graduation_tasks, dependent: :destroy
  has_many :student_graduation_topics, :dependent => :destroy
  has_many :teacher_course_groups, :dependent => :destroy

  # 资源
  has_many :attachments, as: :container, dependent: :destroy
  has_many :attachment_group_settings, :dependent => :destroy

  # 课堂学生，弃用
  has_many :student, :class_name => 'StudentsForCourse', :source => :user


  # 课堂动态
  has_one :course_act, class_name: 'CourseActivity', as: :course_act, dependent: :destroy
  has_many :course_activities

  has_many :tidings, as: :container, dependent: :destroy

  # 开放课堂
  has_many :course_stages, -> { order("course_stages.position ASC") }, dependent: :destroy
  has_many :course_stage_shixuns, dependent: :destroy
  has_many :shixuns, through: :course_stage_shixuns

  # 老版的members弃用  现用course_members
  has_many :members

  # 视频
  has_many :course_videos, dependent: :destroy
  has_many :videos, through: :course_videos

  # 直播
  has_many :live_links, dependent: :destroy

  validate :validate_sensitive_string

  scope :hidden,      ->(is_hidden = true) { where(is_hidden: is_hidden) }
  scope :ended,       ->(is_end = true) { where(is_end: is_end) }
  scope :processing,  -> { where(is_end: false) }
  scope :not_deleted, -> { where(is_delete: 0) }
  scope :not_excellent, -> { where(excellent: 0) }
  scope :deleted,     ->(is_delete = 1) { where(is_delete: is_delete) }
  scope :by_user,     ->(user) { joins(:course_members).where('course_members.user_id = ?', user.id).order(updated_at: :desc) }
  scope :by_keywords, lambda { |keywords|
    where("name LIKE ?", "%#{keywords.split(" ").join('|')}%") unless keywords.blank?
  }
  scope :started,  -> { where("start_date is null or start_date <= '#{Date.today}'") }

  # acts_as_taggable


  # 课程权限判断
  ADMIN = 0       # 超级管理员
  BUSINESS = 1    # 运营人员
  CREATOR = 2     # 课程创建者
  PROFESSOR = 3     # 课程老师
  ASSISTANT_PROFESSOR = 4  # 课程助教
  STUDENT = 5     # 学生
  NORMAL = 6      # 普通用户
  Anonymous = 7      # 普未登录

  validates :name, presence: true, length: { maximum: 60, too_long: "不能超过60个字符" }

  before_save :set_laboratory
  after_create :create_board_sync, :act_as_course_activity, :send_tiding

  def course_member? user_id, role
    course_members.where(user_id: user_id, role: role).exists?
  end

  def course_group_module?
    course_modules.exists?(module_type: "course_group", hidden: 0)
  end

  # 作业对应的子目录/父目录名称
  def category_info type
    course_module = course_modules.find_by(module_type: type)
    { category_id: course_module&.id, category_name: course_module&.module_name }
  end

  # 未分班的学生数
  def none_group_count
    course_members.where(role: 4, course_group_id: 0).size
  end

  def course_member(user_id)
    course_members.find_by(user_id: user_id, is_active: 1)
  end

  def course_student(user_id)
    course_members.find_by(user_id: user_id, role: %i(STUDENT))
  end

  def user_group_name(user_id)
    students.find_by(user_id: user_id)&.course_group_name
  end


  def teacher_group(user_id)
    data =
      if teacher_course_groups.exists?(user_id: user_id)
        teacher_course_groups.joins(:course_group).where(user_id: user_id)
          .pluck('course_groups.id', 'course_groups.name')
      else
        course_groups.pluck(:id, :name)
      end

    data.map { |arr| { group_id: arr.first, group_name: arr.last } }
  end

  #当前老师的班级id
  def teacher_course_ids(user_id)
    course_teacher_member = teacher_course_groups.get_user_groups(user_id).select(:course_group_id) #获取当前老师的分班
    if course_teacher_member.blank?
      if none_group_count > 0  #有未分班的，则发布到未发布分班
        un_group_ids = [0]
      else
        un_group_ids = []
      end
      course_groups.pluck(:id) + un_group_ids   #所有分班和未分班
    else
      course_teacher_member.pluck(:course_group_id).reject(&:blank?).uniq #当前用户所在的班级，老师可能有多个班级
    end
  end

  # 查询老师分班的所有学生
  def teacher_group_user_ids user_id
    teachers = teacher_course_groups.where(user_id: user_id)
    if teachers.exists?
      students.where(course_group_id: teachers.pluck(:course_group_id)).pluck(:user_id)
    else
      students.pluck(:user_id)
    end
  end

  # 创建课程模块
  def create_course_modules(course_module_types)
    course_modules.destroy_all if course_modules.present?

    all_course_module_types.each do |type|
      name = get_name_by_type(type)
      position = get_position_by_type(type)

      hidden = course_module_types.include?(type) ? 0 : 1
      CourseModule.create(course_id: id, module_type: type, position: position, hidden: hidden, module_name: name)
    end
  end

  # 更新课程模块
  def update_course_modules(course_module_types)
    all_course_module_types.each do |type|
      hidden_value = course_module_types.include?(type) ? 0 : 1

      course_module = course_modules.where(module_type: type).first
      course_module.update_attribute(:hidden, hidden_value) if course_module.present?
    end
  end

  def all_course_module_types
    %w[activity announcement online_learning shixun_homework common_homework group_homework exercise attachment course_group graduation poll board statistics video]
  end

  def get_course_module_by_type(type)
    #CourseModule.where(course_id: course_id, module_type: type).first
    self.course_modules.where(module_type: type).first
  end

  # 创建课程讨论区
  def create_board_sync
    boards.create(name: '讨论区', description: name, project_id: -1)
  end

  def delete!
    update_attribute(:is_delete, true)
  end

  def attachment_count
    Attachment.where(container: self).count
  end

  # 课堂某角色的成员数量：[1, 2, 3] 是教师身份、4 学生身份
  def course_member_count(roles)
    course_members.where(role: roles).size
  end

  # 课堂老师
  def teachers
    course_members.where(role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR])
  end

  def teachers_without_assistant_professor
    course_members.where(role: %i[CREATOR PROFESSOR])
  end

  # 更新课程的访问人数
  def update_visits(new_visits)
    update_attributes(visits: new_visits)
  end

  # 老师负责的分班id
  def charge_group_ids user
    member = course_member(user.id)
    group_ids = if member.present?
                  member.teacher_course_groups.size > 0 ? member.teacher_course_groups.pluck(:course_group_id) : course_groups.pluck(:id)
                elsif user.admin_or_business?
                  course_groups.pluck(:id)
                else
                  []
                end
  end

  # 生成邀请码
  CODES = %W(2 3 4 5 6 7 8 9 A B C D E F G H J K L N M O P Q R S T U V W X Y Z)
  def generate_invite_code
    return invite_code if invite_code.present? && invite_code.size >= 5

    code = CODES.sample(5).join
    while Course.exists?(invite_code: code) do
      code = CODES.sample(5).join
    end
    update_attribute(:invite_code, code)

    code
  end

  # 课堂主讨论区
  def course_board
    board = boards.find_by(parent_id: 0)
    return board if board.present?

    create_board_sync
    Board.find_by(parent_id: 0, course_id: id)
  end

  # 是否是课堂的成员(未实现，暂时返回true)
  def member?(user)
    true
  end

  # 是否具有分班权限,返回分班的id
  def group_course_power(user_id)
    teacher_course_groups.where(user_id: user_id).pluck(:course_group_id)
  end

  #课程动态公共表记录
  def act_as_course_activity
    self.course_act << CourseActivity.new(user_id: tea_id, course_id: id)
  end

  # 当前老师分班下的所有学生
  def user_group_students(user_id)
    group_ids = teacher_course_groups.where(user_id: user_id).pluck(:course_group_id)
    course_members.where(course_group_id: group_ids)
  end

  def self_duplicate
    DuplicateCourseService.call(self, User.current)
  end

  def update_quotes attachment
    if attachment.copy_from
      attachments = Attachment.find_by_sql("select * from attachments where copy_from = #{attachment.copy_from} or id =  #{attachment.copy_from}")
    else
      attachments = Attachment.find_by_sql("select * from attachments where copy_from = #{attachment.id} or id = #{attachment.copy_from}")
    end
    attachment.quotes = get_qute_number attachment
    attachment.save
    attachments.each do |att|
      att.quotes = attachment.quotes
      att.save
    end
  end

  def get_qute_number attachment
    if attachment.copy_from
      result = Attachment.find_by_sql("select count(*) as number from attachments where copy_from = #{attachment.copy_from}")
    else
      result = Attachment.find_by_sql("select count(*) as number from attachments where copy_from = #{attachment.id}")
    end
    if result.nil? || result.count <= 0
      0
    else
      result[0].number
    end
  end

  #获取试卷/问卷已发布的班级id，名称和人数。当为统一设置时，显示全部，否则只显示当前已发布的班级信息
  def get_ex_published_course(common_ids)
    teacher_power_courses = []
    publish_groups = course_groups.where(id: common_ids)
    if common_ids.include?(0)
      teacher_power_courses << {course_name:"未分班", course_id: 0, student_count: none_group_count}
    end
    if publish_groups.present?
      publish_groups.each do |group|
        teacher_power_courses << {course_name: group&.name,course_id: group&.id, student_count: group&.course_members_count}
      end
    end
    teacher_power_courses
  end

  def create_stages subject
    if subject
      subject.stages.each do |stage|
        new_stage = CourseStage.create!(course_id: id, name: stage.name, description: stage.description, position: stage.position)
        stage.stage_shixuns.each do |stage_shixun|
          CourseStageShixun.create!(course_id: id, course_stage_id: new_stage.id, shixun_id: stage_shixun.shixun_id, position: stage_shixun.position)
        end
      end
    end
  end

  def learning? user_id
    Myshixun.where(user_id: user_id, shixun_id: shixuns).exists?
  end

  def my_subject_progress myshixuns
    my_challenge_count = Game.where(myshixun_id: myshixuns.pluck(:id), status: 2).pluck(:challenge_id).uniq.size
    course_challeng_count = shixuns.pluck(:challenges_count).sum
    count = course_challeng_count == 0 ? 0 : ((my_challenge_count.to_f / course_challeng_count).round(2) * 100).to_i
  end

  # 课堂实训作业的评测次数
  def evaluate_count
    course_user_ids = students.pluck(:user_id)
    shixun_ids = homework_commons.joins(:homework_commons_shixun).where(homework_type: 4).pluck(:shixun_id)
    return 0 if shixun_ids.blank?
    Game.joins(:challenge).where(challenges: {shixun_id: shixun_ids}, games: {user_id: course_user_ids}).sum(:evaluate_count)
  end

  def max_activity_time
    course_acts.pluck(:updated_at).max
  end

  # 课堂作业数
  def course_homework_count type
    homework_commons.select{|homework| homework.homework_type == type}.size
  end

  private

  #创建课程后，给该用户发送消息
  def send_tiding
    self.tidings << Tiding.new(user_id: tea_id, trigger_user_id: 0, belong_container_id: id,
                               belong_container_type: 'Course', tiding_type: 'System')
  end

  def get_name_by_type(type)
    case type
    when 'activity'        then '动态'
    when 'announcement'    then '公告栏'
    when 'online_learning' then '课程学习'
    when 'shixun_homework' then '实训作业'
    when 'common_homework' then '普通作业'
    when 'group_homework'  then '分组作业'
    when 'graduation'      then '毕业设计'
    when 'exercise'        then '试卷'
    when 'poll'            then '问卷'
    when 'attachment'      then '资源'
    when 'video'           then '视频直播'
    when 'board'           then '讨论'
    when 'course_group'    then '分班'
    when 'statistics'      then '统计'
    else ''
    end
  end

  def get_position_by_type(type)
    case type
    when 'activity'        then 1
    when 'announcement'    then 2
    when 'online_learning' then 3
    when 'shixun_homework' then 4
    when 'common_homework' then 5
    when 'group_homework'  then 6
    when 'graduation'      then 7
    when 'exercise'        then 8
    when 'poll'            then 9
    when 'attachment'      then 10
    when 'video'           then 11
    when 'board'           then 12
    when 'course_group'    then 13
    when 'statistics'      then 14
    else 100
    end
  end

  def set_laboratory
    return unless new_record? # 新记录才需要标记

    self.laboratory = Laboratory.current if laboratory_id.blank?
  end

  def validate_sensitive_string
    raise("课堂名称包含敏感词汇，请重新输入") unless HarmoniousDictionary.clean?(name)
  end
end
