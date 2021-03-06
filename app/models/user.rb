# == Schema Information
#
# Table name: users
#
#  id                         :integer          not null, primary key
#  login                      :string(255)      default(""), not null
#  hashed_password            :string(40)       default(""), not null
#  firstname                  :string(30)       default(""), not null
#  lastname                   :string(255)      default(""), not null
#  mail                       :string(60)
#  admin                      :boolean          default("0"), not null
#  status                     :integer          default("1"), not null
#  last_login_on              :datetime
#  language                   :string(5)        default("")
#  auth_source_id             :integer
#  created_on                 :datetime
#  updated_on                 :datetime
#  type                       :string(255)
#  identity_url               :string(255)
#  mail_notification          :string(255)      default(""), not null
#  salt                       :string(64)
#  gid                        :integer
#  visits                     :integer          default("0")
#  excellent_teacher          :integer          default("0")
#  excellent_student          :integer          default("0")
#  phone                      :string(255)
#  authentication             :boolean          default("0")
#  grade                      :integer          default("0")
#  experience                 :integer          default("0")
#  nickname                   :string(255)
#  show_realname              :boolean          default("1")
#  professional_certification :boolean          default("0")
#  ID_number                  :string(255)
#  certification              :integer          default("0")
#  homepage_teacher           :boolean          default("0")
#  homepage_engineer          :boolean          default("0")
#  is_test                    :integer          default("0")
#  ecoder_user_id             :integer          default("0")
#  business                   :boolean          default("0")
#  profile_completed          :boolean          default("0")
#  laboratory_id              :integer
#  is_shixun_marker           :boolean          default("0")
#  admin_visitable            :boolean          default("0")
#  collaborator               :boolean          default("0")
#  gitea_uid                  :integer
#  is_sync_pwd                :boolean          default("1")
#  watchers_count             :integer          default("0")
#  devops_step                :integer          default("0")
#  gitea_token                :string(255)
#  platform                   :string(255)
#
# Indexes
#
#  index_users_on_ecoder_user_id     (ecoder_user_id)
#  index_users_on_homepage_engineer  (homepage_engineer)
#  index_users_on_homepage_teacher   (homepage_teacher)
#  index_users_on_laboratory_id      (laboratory_id)
#  index_users_on_login              (login) UNIQUE
#  index_users_on_mail               (mail) UNIQUE
#  index_users_on_phone              (phone) UNIQUE
#  index_users_on_type               (type)
#

class User < Owner
  default_scope {where(type: %w(User AnonymousUser))}
  extend Enumerize

  include Watchable
  include Likeable
  include BaseModel
  include Droneable
  include User::Avatar
  # include Searchable::Dependents::User

  # devops step
  # devops_step column:  0: ???????????????????????????1: ????????????????????????(?????????)???2: ?????????
  DEVOPS_UNINIT = 0
  DEVOPS_UNVERIFIED = 1
  DEVOPS_CERTIFICATION = 2

  # Account statuses
  STATUS_ANONYMOUS  = 0
  STATUS_ACTIVE     = 1
  STATUS_REGISTERED = 2
  STATUS_LOCKED     = 3

  # tpi tpm????????????
  EDU_ADMIN = 1       # ???????????????
  EDU_BUSINESS = 2    # ????????????
  EDU_SHIXUN_MANAGER = 3 # ???????????????
  EDU_SHIXUN_MEMBER = 4  # ????????????
  EDU_CERTIFICATION_TEACHER = 5 # ?????????????????????
  EDU_GAME_MANAGER = 6     # TPI????????????
  EDU_TEACHER = 7 # ????????????,???????????????
  EDU_NORMAL = 8  # ????????????

  VALID_EMAIL_REGEX = /^[a-zA-Z0-9]+([.\-_\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i
  VALID_PHONE_REGEX = /^1\d{10}$/
  # ?????????
  VALID_NUMBER_REGEX = /(^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^([A-Z]\d{6,10}(\(\w{1}\))?)$)/

  LOGIN_LENGTH_LIMIT = 30
  MAIL_LENGTH_LMIT = 60

  MIX_PASSWORD_LIMIT = 8

  LOGIN_CHARS = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z).freeze

  # FIX Invalid single-table inheritance type
  # self.inheritance_column = nil

  # educoder: ??????Educoder??????
  # trustie: ??????Trustie??????
  # forge: ???????????????????????????
  # military: ???????????????
  enumerize :platform, in: [:forge, :educoder, :trustie, :military], default: :forge, scope: :shallow

  belongs_to :laboratory, optional: true
  has_one :user_extension, dependent: :destroy
  has_many :open_users, dependent: :destroy
  has_one :wechat_open_user, class_name: 'OpenUsers::Wechat'
  has_one :qq_open_user, class_name: 'OpenUsers::QQ'
  accepts_nested_attributes_for :user_extension, update_only: true
  has_many :fork_users, dependent: :destroy

  has_many :versions
  has_many :issue_times, :dependent => :destroy

  has_one :onclick_time, :dependent => :destroy

  # ????????????
  has_many :private_messages, dependent: :destroy
  has_many :recent_contacts, through: :private_messages, source: :target
  has_many :tidings, :dependent => :destroy
  has_many :journals_for_messages, :as => :jour, :dependent => :destroy

  has_many :attachments,foreign_key: :author_id, :dependent => :destroy

  has_one :ci_cloud_account, class_name: 'Ci::CloudAccount', dependent: :destroy

  # ??????
  has_many :apply_user_authentication
  has_one :process_real_name_apply, -> { processing.real_name_auth.order(created_at: :desc) }, class_name: 'ApplyUserAuthentication'
  has_one :process_professional_apply, -> { processing.professional_auth.order(created_at: :desc) }, class_name: 'ApplyUserAuthentication'
  has_many :apply_actions, dependent: :destroy
  has_many :trail_auth_apply_actions, -> { where(container_type: 'TrialAuthorization') }, class_name: 'ApplyAction'

  # has_many :attendances
  has_many :applied_messages, dependent: :destroy
  has_many :operate_applied_messages, class_name: 'AppliedMessage', dependent: :destroy
  # ??????
  has_many :applied_projects, dependent: :destroy
  has_many :operate_applied_transfer_projects, class_name: 'AppliedTransferProject', dependent: :destroy
  has_many :members, dependent: :destroy 
  has_many :team_users, dependent: :destroy
  has_many :teams, through: :team_users

  # ????????????
  # has_many :libraries, dependent: :destroy
  has_many :project_trends, dependent: :destroy
  has_many :oauths , dependent: :destroy

  has_many :organization_users, dependent: :destroy
  has_many :organizations, through: :organization_users
  has_many :pinned_projects, dependent: :destroy
  has_many :is_pinned_projects, through: :pinned_projects, source: :project
  accepts_nested_attributes_for :is_pinned_projects
  has_many :issues, dependent: :destroy, foreign_key: :author_id 
  has_many :pull_requests, dependent: :destroy
  has_many :public_keys, class_name: "Gitea::PublicKey",primary_key: :gitea_uid, foreign_key: :owner_id, dependent: :destroy

  has_one :user_template_message_setting, dependent: :destroy

  has_many :system_notification_histories
  has_many :system_notifications, through: :system_notification_histories
  
  # Groups and active users
  scope :active, lambda { where(status: STATUS_ACTIVE) }
  scope :like, lambda { |keywords|
    sql = "CONCAT(lastname, firstname) LIKE :search OR nickname LIKE :search OR login LIKE :search OR mail LIKE :search OR nickname LIKE :search"
    where(sql, :search => "%#{keywords.split(" ").join('|')}%") unless keywords.blank?
  }

  scope :simple_select, -> {select(:id, :login, :lastname,:firstname, :nickname, :gitea_uid, :type)}

  attr_accessor :password, :password_confirmation

  delegate :description, :gender, :department_id, :school_id, :location, :location_city,
           :show_email, :show_location, :show_department,
           :technical_title, :province, :city, :custom_department, to: :user_extension, allow_nil: true

  before_save :update_hashed_password, :set_lastname
  after_save :reset_cache_data
  after_create do
    SyncTrustieJob.perform_later("user", 1) if allow_sync_to_trustie?
  end

  #
  # validations
  #
  # validates_presence_of :login, :if => Proc.new { |user| !user.is_a?(AnonymousUser) }, case_sensitive: false
  validates_uniqueness_of :login, :if => Proc.new { |user| user.login_changed? && user.login.present? }, case_sensitive: false
  validates_uniqueness_of :mail, :if => Proc.new { |user| user.mail_changed? && user.mail.present? }, case_sensitive: false
  # validates_uniqueness_of :phone, :if => Proc.new { |user| user.phone_changed? && user.phone.present? }, case_sensitive: false
  validates_length_of :login, maximum: LOGIN_LENGTH_LIMIT
  validates_length_of :mail, maximum: MAIL_LENGTH_LMIT
  validate :validate_sensitive_string
  validate :validate_password_length

  def reset_cache_data
    Cache::V2::OwnerCommonService.new(self.id).reset
  end

  # ???????????????????????????
  def full_member_projects 
    normal_projects = Project.members_projects(self.id).to_sql
    org_projects = Project.joins(teams: :team_users).where(team_users: {user_id: self.id}).to_sql
    return Project.from("( #{ normal_projects} UNION #{ org_projects } ) AS projects").distinct
  end

  # ???????????????????????????
  def full_admin_projects 
    normal_projects = Project.joins(members: :roles).where(roles: {name: 'Manager'}, members: {user_id: self.id}).to_sql
    org_projects = Project.joins(teams: :team_users).where(teams: {authorize: %w(admin owner)}, team_users: {user_id: self.id}).to_sql
    return Project.from("( #{ normal_projects} UNION #{ org_projects } ) AS projects").distinct
  end

  def name
    login
  end
  
  # ?????????????????????token??????????????????????????????????????????
  def delete_autologin_token(value)
    Token.where(:user_id => id, :action => 'autologin', :value => value).delete_all
  end

  def delete_session_token(value)
    Token.where(:user_id => id, :action => 'session', :value => value).delete_all
  end

  def git_mail
    mail.blank? ? "#{login}@educoder.net" : mail
  end

  def project_manager?(project)
    project.manager?(self) || self.admin?
  end

  # ??????
  def student_id
    self.user_extension.try(:student_id)
  end

  # ?????????
  def follow_count
    Watcher.where(user_id: self.id, watchable_type: %w(User)).count
    # User.watched_by(id).count
  end

  # ?????????
  def fan_count
    Watcher.where(watchable_type: %w(User), watchable_id: self.id).count
    # watchers.count
  end

  # ?????????????????????????????????
  def is_teacher?
    self.user_extension.teacher?
  end

  # ?????????????????????
  def is_certification_teacher
    self.user_extension.teacher? && self.professional_certification
  end

  def certification_teacher?
    professional_certification? && user_extension.teacher?
  end

  # ?????????????????????
  def identity
    ue = self.user_extension
    unless ue.blank?
      if ue.teacher?
        ue.technical_title ? ue.technical_title : "??????"
      elsif ue.student?
        "??????"
      else
        ue.technical_title ? ue.technical_title : "????????????"
      end
    end
  end

  # ??????????????????
  def auth_status
    status = if authentication
              "?????????"
            elsif process_real_name_apply.present?
              "?????????"
            else
              "?????????"
            end
  end

  # ??????????????????
  def pro_status
    status = if professional_certification
               "?????????"
             elsif process_professional_apply.present?
               "?????????"
             else
               "?????????"
             end
  end

  # ??????????????????????????????????????????
  def pro_certification?
    professional_certification
  end

  # ?????????????????????
  def school_province
    user_extension&.school&.province || ''
  end

  # ?????????????????????
  # def school_name
  #   user_extension&.school&.name || ''
  # end

  # ?????????????????????
  def department_name
    user_extension&.department&.name || ''
  end

  # ?????????????????????
  def course_role course
    course.course_members.where(user_id: id).pluck(:role)
  end

  # ???????????????(???????????????????????????)
  def teacher_of_course?(course)
    course.course_members.exists?(user_id: id, role: [1,2,3], is_active: 1) || admin? || business?
  end

  # ???????????????(???????????????????????????)?????????????????????????????????
  def none_admin_teacher_of_course?(course)
    course.course_members.exists?(user_id: id, role: [1,2,3], is_active: 1)
  end

  # ???????????????(???????????????????????????)???????????????????????????
  def teacher_of_course_non_active?(course)
    course.course_members.exists?(user_id: id, role: [1,2,3])
  end

  # ??????????????????????????????????????????????????????
  def teacher_or_admin?(course)
    course.course_members.exists?(user_id: id, role: [1,2], is_active: 1) || admin? || business?
  end

  # ??????????????????(??????????????????????????????)
  def creator_of_course?(course)
    course.course_members.exists?(user_id: id, role: 1, is_active: 1) || admin? || business?
  end

  # ???????????????
  def student_of_course?(course)
    course.course_members.exists?(user_id: id, role: %i[STUDENT], is_active: 1)
  end

  # ????????????
  def member_of_course?(course)
    course&.course_members.exists?(user_id: id)
  end

  # ?????????????????????
  def creator_of_subject?(subject)
    subject.user_id == id || admin?
  end

  # ???????????????????????????admin
  def manager_of_subject?(subject)
    subject.subject_members.exists?(user_id: id, role: [1,2]) || admin? || business?
  end

  # ????????????????????????????????????admin
  def manager_of_shixun?(shixun)
    logger.info("############id: #{id}")
     shixun.shixun_members.exists?(role: [1,2], user_id: id) || admin? || business?
  end

  # ???????????????
  def creator_of_shixun?(shixun)
    id == shixun.user_id
  end

  # ??????????????????
  def member_of_shixun?(shixun)
    #self.shixun_members.where(:role => 2, :shixun_id => shixun.id).present?
    shixun.shixun_members.exists?(role: 2, user_id: id)
  end

  # TPI????????????
  def creator_of_game?(game)
    id == game.user_id
  end

  # ??????????????????
  def active?
    status == STATUS_ACTIVE
  end

  def registered?
    status == STATUS_REGISTERED
  end

  def locked?
    status == STATUS_LOCKED
  end

  def activate
    self.status = STATUS_ACTIVE
  end

  def register
    self.status = STATUS_REGISTERED
  end

  def lock
    self.status = STATUS_LOCKED
  end

  def activate!
    update_attribute(:status, STATUS_ACTIVE)
    prohibit_gitea_user_login!(false)
  end

  def register!
    update_attribute(:status, STATUS_REGISTERED)
  end

  def lock!
    update_attribute(:status, STATUS_LOCKED)
    prohibit_gitea_user_login!
  end

  def prohibit_gitea_user_login!(prohibit_login = true)
    Gitea::User::UpdateInteractor.call(self.login, 
      {email: self.mail, prohibit_login: prohibit_login})
  end

  # ??????????????????
  def course_identity(course)
    if !logged?
      Course::Anonymous
    elsif admin?
      Course::ADMIN
    elsif business?
      Course::BUSINESS
    else
      role = course&.course_members&.find_by(user_id: id, is_active: 1)&.role
      case role
      when nil                   then Course::NORMAL
      when 'CREATOR'             then Course::CREATOR
      when 'PROFESSOR'           then Course::PROFESSOR
      when 'STUDENT'             then Course::STUDENT
      when 'ASSISTANT_PROFESSOR' then Course::ASSISTANT_PROFESSOR
      end
    end
  end

  # ??????????????????
  def shixun_identity(shixun)
    @identity =
        if admin?
          User::EDU_ADMIN
        elsif business?
          User::EDU_BUSINESS
        elsif creator_of_shixun?(shixun)
          User::EDU_SHIXUN_MANAGER
        elsif member_of_shixun?(shixun)
          User::EDU_SHIXUN_MEMBER
        elsif is_certification_teacher
          User::EDU_CERTIFICATION_TEACHER
        elsif is_teacher?
          User::EDU_TEACHER
        else
          User::EDU_NORMAL
        end
    return @identity
  end

  # tpi???????????????
  def game_identity(game)
    shixun = game.myshixun.shixun
    @identity =
        if admin?
          User::EDU_ADMIN
        elsif business?
          User::EDU_BUSINESS
        elsif creator_of_shixun?(shixun)
          User::EDU_SHIXUN_MANAGER
        elsif member_of_shixun?(shixun)
          User::EDU_SHIXUN_MEMBER
        elsif is_certification_teacher
          User::EDU_CERTIFICATION_TEACHER
        elsif creator_of_game?(game)
          User::EDU_GAME_MANAGER
        elsif is_teacher?
          User::EDU_TEACHER
        else
          User::EDU_NORMAL
        end
    return @identity
  end

  # ????????????
  def my_shixuns
    shixun_ids = shixun_members.pluck(:shixun_id) + myshixuns.pluck(:shixun_id)
    Shixun.where(:id => shixun_ids).visible
  end

  # ?????????????????????????????????
  # 1???????????????????????????????????????
  # 2????????????????????????????????????????????????????????????
  # 3??????????????????????????????????????????????????????????????????????????????????????????
  def shixun_permission(shixun)
    case shixun.status
    when -1 # ?????????????????????????????????
      admin?
    when 0, 1, 3 # ????????????????????????????????????????????????????????????????????????
      manager_of_shixun?(shixun)
    when 2
      if shixun.hidden
        manager_of_shixun?(shixun)
      else
        shixun.use_scope == 0  || manager_of_shixun?(shixun) || shixun.shixun_schools.exists?(school_id: school_id)
      end
    end
  end

  # ????????????????????????????????????
  def full_name
    return '??????' unless logged?

    name = show_realname? ? lastname + firstname : nickname
    name.blank? ? (nickname.blank? ? login : nickname) : name
  end

  # ??????????????????????????????????????????????????????????????????????????????????????????????????????
  def real_name
    return '??????' unless logged?
    name = lastname + firstname
    name = name.blank? ? (nickname.blank? ? login : nickname) : name
    name.gsub(/\s+/, '').strip    #6.11 -hs
  end

  def only_real_name
    "#{lastname}#{firstname}"
  end

  # ??????????????????????????????
  def selected_topic?(topic)
    student_graduation_topics.where(graduation_topic_id: topic.id).last.try(:status)
  end

  def click_time
    click_time = OnclickTime.find_by(user_id: id) || OnclickTime.create(user_id: id, onclick_time: created_on)
    click_time.onclick_time
  end

  def manager_of_memo?(memo)
    id == memo.author_id || admin? || business?
  end

  # ????????????????????????
  def manager_of_project?(project)
    project.project_members.where(user_id: id).count > 0
  end

  def logged?
    true
  end

  def active?
    status == STATUS_ACTIVE
  end

  def locked?
    status == STATUS_LOCKED
  end

  def phone_binded?
    phone.present?
  end

  def email_binded?
    mail.present?
  end

  # def self.current=(user)
  #   Thread.current[:current_user] = user
  # end
  #
  # def self.current
  #   Thread.current[:current_user] ||= User.anonymous
  # end

  def self.current=(user)
    RequestStore.store[:current_user] = user
  end

  def self.current
    RequestStore.store[:current_user] ||= User.anonymous
  end

  def self.anonymous
    anonymous_user = AnonymousUser.unscoped.take
    if anonymous_user.nil?
      anonymous_user = AnonymousUser.unscoped.create(lastname: 'Anonymous', firstname: '', login: '', mail: '358551897@qq.com', phone: '13333333333', status: 0, platform: User.platform.forge)
      raise "Unable to create the anonymous user??? error_info:#{anonymous_user.errors.messages}" if anonymous_user.new_record?
    end
    anonymous_user
  end

  # Returns the user who matches the given autologin +key+ or nil
  def self.try_to_autologin(key)
    user = Token.find_active_user('autologin', key)
    user.update(last_login_on: Time.now) if user
    user
  end

  def self.hash_password(clear_password)
    Digest::SHA1.hexdigest(clear_password || "")
  end

  def check_password?(clear_password)
    # Preventing Timing Attack
    ActiveSupport::SecurityUtils.secure_compare(
      User.hash_password("#{salt}#{User.hash_password clear_password}"),
      hashed_password
    )
  end

  # ?????????????????????
  def ec_school
    school_id = self.ec_school_users.pluck(:school_id).first ||
        self.ec_major_schools.pluck(:school_id).first ||
        (self.ec_course_users.first && self.ec_course_users.first.try(:ec_course).try(:ec_year).try(:ec_major_school).try(:school_id))
  end

  # ????????????????????????????????????????????????
  def self.try_to_login(login, password)
    login = login.to_s.strip
    password = password.to_s

    # Make sure no one can sign in with an empty login or password
    return nil if login.empty? || password.empty?
    if (login =~ VALID_EMAIL_REGEX)
      user = find_by_mail(login)
    elsif (login =~ VALID_PHONE_REGEX)
      user = find_by_phone(login)
    else
      user = find_by_login(login)
    end

    user
  rescue => text
    raise text
  end

  def show_real_name
    name = lastname + firstname
    if name.blank?
      nickname.blank? ? login : nickname
    else
      name
    end
  end

  def update_hashed_password
    if password
      salt_password(password)
    end
  end

  def salt_password(clear_password)
    self.salt = User.generate_salt
    self.hashed_password = User.hash_password("#{salt}#{User.hash_password clear_password}")
  end

  def self.generate_salt
    Gitlink::Utils.random_hex(16)
  end

  # ???????????????
  def all_certified?
    authentication? && professional_certification?
  end

  # ??????????????????
  def email_binded?
    mail.present?
  end

  # ????????????123***123
  def hidden_phone
    Util.conceal(phone, :phone).to_s
  end

  # ?????????w***l@qq.com
  def hidden_mail
    Util.conceal(mail, :email).to_s
  end

  # ?????????url??????
  # def college_identifier
  #   Department.find_by_id(department_members.pluck(:department_id).first)&.identifier
  # end

  # ?????????????????????
  def can_apply_trial?
    return false if certification == 1

    apply = ApplyAction.order(created_at: :desc).find_by(user_id: id, container_type: 'TrialAuthorization')

    apply.present? && !apply.status.zero?
  end

  def projects_count
    Project.includes(:members).joins(:members).where(members: { user_id: self.id }).select(:id).size
  end

  # ??????????????????
  def attendance_signed?
    attendance = Attendance.find_by(user_id: id)

    attendance.present? && Util.days_between(Time.zone.now, attendance.created_at).zero?
  end

  # ??????????????????
  def tomorrow_attendance_gold
    Attendance.find_by(user_id: id)&.next_gold || 60  # ??????50???????????????+10
  end

  def admin_or_business?
    admin? || business?
  end

  def self.generate_login(prefix)
    login = prefix + LOGIN_CHARS.sample(8).join('')
    while User.exists?(login: login)
      login = prefix + LOGIN_CHARS.sample(8).join('')
    end

    login
  end

  def bind_open_user?(type)
    case type
    when 'wechat' then wechat_open_user.present?
    when 'qq' then qq_open_user.present?
    else false
    end
  end

  def reset_login_times!
    LimitForbidControl::UserLogin.new(self).clear
  end

  def from_sub_site?
    laboratory_id.present? && laboratory_id != 1
  end

  def profile_is_completed?
    self.nickname.present? && self.gender.present? && self.mail.present? && self.custom_department.present?
  end

  protected
  def validate_password_length
    # ???????????????????????????5???
    if password.present? && password.size < MIX_PASSWORD_LIMIT && !User.current.admin?
      raise("????????????????????????#{MIX_PASSWORD_LIMIT}???")
    end

    if password.present? && password.size > 16
      raise('????????????????????????16???')
    end
  end

  def validate_sensitive_string
    raise("????????????????????????????????????????????????") if lastname && !HarmoniousDictionary.clean?(lastname)
    raise("??????????????????????????????????????????") if nickname && !HarmoniousDictionary.clean?(nickname)
  end

  def set_laboratory
    return unless new_record?

    self.laboratory = Laboratory.current if laboratory_id.blank?
  end

  def set_lastname
    self.lastname = self.nickname if changes[:nickname].present?
  end
end


class AnonymousUser < User
  validate :validate_anonymous_uniqueness, :on => :create

  def validate_anonymous_uniqueness
    # There should be only one AnonymousUser in the database
    errors.add :base, 'An anonymous user already exists.' if AnonymousUser.exists?
  end

  def available_custom_fields
    []
  end

  # Overrides a few properties
  def logged?; false end
  def admin; false end
  def name(*args); I18n.t(:label_user_anonymous) end
  # def mail=(*args); nil end
  # def mail; nil end
  def time_zone; nil end
  def rss_key; nil end


  def membership(*args)
    nil
  end

  def member_of?(*args)
    false
  end

  # Anonymous user can not be destroyed
  def destroy
    false
  end

  protected

  def instantiate_email_address
  end

end
