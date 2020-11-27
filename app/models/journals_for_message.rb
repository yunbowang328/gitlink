# == Schema Information
#
# Table name: journals_for_messages
#
#  id                          :integer          not null, primary key
#  jour_id                     :integer
#  jour_type                   :string(255)
#  user_id                     :integer
#  notes                       :text(65535)
#  status                      :integer
#  reply_id                    :integer
#  created_on                  :datetime         not null
#  updated_on                  :datetime         not null
#  m_parent_id                 :string(255)
#  is_readed                   :boolean
#  m_reply_count               :integer
#  m_reply_id                  :integer
#  is_comprehensive_evaluation :integer
#  private                     :integer          default("0")
#  root_id                     :integer
#  hidden                      :boolean          default("0")
#  praises_count               :integer          default("0")
#
# Indexes
#
#  index_journals_for_messages_on_jour_id  (jour_id)
#  index_journals_for_messages_on_root_id  (root_id)
#

class JournalsForMessage < ApplicationRecord
  belongs_to :jour, :polymorphic => true
  belongs_to :user
  belongs_to :parent, class_name: "JournalsForMessage", foreign_key: "m_parent_id",
             counter_cache: :m_reply_count, optional: true

  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy

  #scope :children, -> {where(m_parent_id: self.id).includes(:user).reorder("created_on asc")}
  #scope :children, -> (discuss_id){ where(parent_id: discuss_id).includes(:user).reorder("created_at asc") }

  scope :parent_comment, -> { where(m_parent_id: nil)}
  scope :search_by_jour_type, lambda{|type,ids| where(jour_type:type,jour_id: ids)}
  has_many :tidings, as: :container, dependent: :destroy

  # "jour_type", # 留言所属类型
  # "jour_id", # 留言所属类型的id
  # "notes", # 留言内容
  # "reply_id", # 留言被回复留言者的用户id(用户a回复了用户b，这是b的id，用以查询谁给b留言了)
  # "status", # 留言是否被查看(弃用)
  # "user_id", # 留言者的id
  # "m_parent_id", # 留言信息的父留言id
  # "is_readed", # 留言是否已读
  # "m_reply_count", # 留言的回复数量
  # "m_reply_id" ,  # 回复某留言的留言id(a留言回复了b留言，这是b留言的id)
  # "is_comprehensive_evaluation",  # 1 教师评论、2 匿评、3 留言
  # "hidden", 隐藏、

  validates :notes, length: { maximum: 2000, too_long: "不能超过2000个字符" }

  after_create :send_tiding


  # course_identity 课堂用户身份
  def contents_show course_identity
    if self.hidden && course_identity >= Course::STUDENT
      nil
    else
      self.notes
    end
  end

  def can_delete course_identity
    course_identity < Course::STUDENT
  end

  def created_at
    self.created_on
  end

  def children page, limit
    JournalsForMessage.includes(:user).where(m_parent_id: self.id).page(page).per(limit).reorder("created_on asc")
  end


  def send_tiding
    # 回复和@同一个人时：只发@的消息（因@的消息先创建）
    case self.jour_type
      # 用户留言当做私信处理  不发消息
    when "Principal"
=begin
        user_id = self.m_parent_id.present? ? JournalsForMessage.find(self.m_parent_id).user_id : self.jour_id
        if user_id != self.user_id && !self.tidings.where(:user_id => user_id, :trigger_user_id => self.user_id, :tiding_type => "Mentioned").first.present?
          self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => user_id, :parent_container_id => self.jour_id, :parent_container_type => self.jour_type, :belong_container_id => self.jour_id, :belong_container_type => "User", :viewed => 0, :tiding_type => self.m_parent_id.present? ? "Comment" : "Journal")
        end
=end
    when "HomeworkCommon", "GraduationTopic"
      user_id = self.m_parent_id.present? ? JournalsForMessage.find(self.m_parent_id).user_id : (self.jour_type == "HomeworkCommon" ? self.jour.user_id : self.jour.tea_id)
      if user_id != self.user_id && !self.tidings.where(:user_id => user_id, :trigger_user_id => self.user_id, :tiding_type => "Mentioned").first.present?
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => user_id, :parent_container_id => self.jour_id, :parent_container_type => self.jour_type, :belong_container_id => self.jour.course_id, :belong_container_type => "Course", :viewed => 0, :tiding_type => "Comment")
      end
    when "StudentWorksScore"
      course_id = self.jour.try(:student_work).try(:homework_common).try(:course_id)
      user_id = self.m_parent_id.present? ? JournalsForMessage.find(self.m_parent_id).user_id : self.jour.user_id
      if user_id != self.user_id && !self.tidings.where(:user_id => user_id, :trigger_user_id => self.user_id, :tiding_type => "Mentioned").first.present?
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => user_id, :parent_container_id => self.jour_id, :parent_container_type => self.jour_type, :belong_container_id => course_id, :belong_container_type => "Course", :viewed => 0, :tiding_type => "Comment")
      end
    end
  end
end
