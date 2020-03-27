class Project < ApplicationRecord
  include Matchable
  include Publicable
  include Watchable
  include ProjectOperable

  enum project_type: { mirror: 1, common: 0 } # common:开源托管项目, mirror:开源镜像项目

  belongs_to :ignore, optional: true
  belongs_to :license, optional: true
  belongs_to :owner, class_name: 'User', foreign_key: :user_id
  belongs_to :project_category, optional: true , :counter_cache => true
  belongs_to :project_language, optional: true , :counter_cache => true
  has_many :project_trends, dependent: :destroy

  has_many :commits, dependent: :destroy

  has_one :project_score, dependent: :destroy
  has_one :repository, dependent: :destroy
  has_many :pull_requests, dependent: :destroy
  has_many :issue_tags, dependent: :destroy
  has_many :issues, dependent: :destroy
  has_many :user_grades, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy
  has_one :project_score, dependent: :destroy
  has_many :versions, -> { order("versions.effective_date DESC, versions.name DESC") }, dependent: :destroy
  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_and_belongs_to_many :trackers, :order => "#{Tracker.table_name}.position"

  after_save :check_project_members
  scope :project_statics_select, -> {select(:id,:name, :is_public, :identifier, :status, :project_type, :user_id, :forked_count, :visits, :project_category_id, :project_language_id, :license_id, :ignore_id, :watchers_count, :created_on)}


  # 创建者
  def creator
    User.find(user_id).full_name
  end

  def members_user_infos
    members.joins("left join users on members.user_id = users.id").includes(:user)
    # members.joins("left join users on members.user_id = users.id").select("users.id", "users.login","users.firstname","users.lastname")
    #   .pluck("users.id", "users.login","users.lastname", "users.firstname")
  end

  def to_param
    self.identifier.parameterize
  end

  def get_issues_count(status_id)
    if status_id.present?
      self&.issues.issue_issue.select(:id, :status_id).where(status_id: status_id)&.pluck(:id).size
    else
      self&.issues.issue_issue.select(:id)&.pluck(:id).size
    end
  end

  def get_pull_requests_count(status_id)
    if status_id.present?
      self&.pull_requests.select(:id, :status).where(status: status_id)&.pluck(:id).size
    else
      self&.pull_requests.select(:id)&.pluck(:id).size
    end
  end

  #创建项目管理员
  def check_project_members
    unless members.present? && members.exists?(user_id: self.user_id)
      member_params = {
        user_id: self.user_id,
        project_id: self.id
      }
      user_member = Member.new(member_params)
      if user_member.save
        role_id = Role.select(:id,:position).where(position: 3)&.first&.id
        MemberRole.create!(member_id: user_member.id ,role_id: role_id)
      end
    end
  end


  def self.init_bluck_repository
    Project.includes(:repository).find_each do |project|
      puts project.id
      next if project.owner.blank?
      if project.repository.blank?
        puts  "########### start create repositoy #############"
        Repository.create!(project_id: project.id, identifier: Project.generate_identifier, user_id: project&.owner&.id)
      end
    end
  end

  def self.generate_identifier
    str_arr = (("a".."z").to_a + ("A".."Z").to_a)

    str = str_arr.shuffle[0..8].join
    while Repository.exists?(identifier: str)
      str = str_arr.shuffle[0..8].join
    end
    str
  end

  def self.list_user_projects(user_id)
    user_not_show = Project.joins(:members).where("projects.is_public = ? and projects.user_id != ? and members.user_id != ?", false, user_id,user_id).pluck(:id).uniq
    Project.where.not(id: user_not_show)
  end

end
