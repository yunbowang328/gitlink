class Memo < ApplicationRecord
  include Searchable::Memo

  belongs_to :forum, touch: true

  has_many :memo_tag_repertoires, dependent: :destroy
  has_many :tag_repertoires, :through => :memo_tag_repertoires

  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_one :praise_tread_cache, as: :object, dependent: :destroy

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  belongs_to :parent, class_name: 'Memo', foreign_key: 'parent_id'

  has_many :descendants, foreign_key: :root_id, class_name: 'Memo'
  has_many :children, foreign_key: :parent_id, class_name: 'Memo'
  has_many :attachments, as: :container, dependent: :destroy
  has_many :tidings, as: :container, dependent: :destroy
  validate :validate_sensitive_string

  scope :field_for_list, lambda{
    select([:id, :subject, :author_id, :sticky, :updated_at, :language, :reward, :all_replies_count, :viewed_count, :forum_id])
  }
  scope :user_posts, -> (user_id){ where(root_id: nil, author_id: user_id, forum_id: [3, 5]) }
  scope :field_for_recommend, -> { select([:id, :subject, :language, :forum_id, :all_replies_count]) }
  scope :memo_replies, -> (id) { where(root_id: id) }
  scope :hot, -> { order("all_replies_count desc, updated_at desc") }
  scope :posts, -> { where(root_id: nil, forum_id: [3, 5]) }

  validates :content, length: { maximum: 10000, too_long: "不能超过10000个字符" }

  after_create :send_tiding

  # 帖子的回复
  def reply_for_memo
    Memo.where(parent_id: id)
  end

  # 子回复
  def children_of_reply
    Memo.where(parent_id: id).includes(:author).reorder("created_at asc")
  end

  # 主贴的名称
  def main_subject
    memo = Memo.find_by(root_id: id)
    Rails.logger.info("###############memo: #{memo&.subject}")
    memo ? memo.subject : subject
  end

  private

  def send_tiding
    tiding_attr = {
      trigger_user_id: author_id, viewed: 0, tiding_type: 'Comment',
      parent_container_type: 'Memo', belong_container_id: forum_id, belong_container_type: 'Forum'
    }
    if parent_id.present?
      tiding_attr.merge!(user_id: parent.author_id, parent_container_id: root_id)
    else
      # 新帖子给超级管理员发消息
      tiding_attr.merge!(user_id: 1, parent_container_id: id)
    end

    self.tidings << Tiding.new(tiding_attr)
  end

  def validate_sensitive_string
    raise("标题包含敏感词汇，请重新输入") unless HarmoniousDictionary.clean?(subject)
    raise("内容包含敏感词汇，请重新输入") unless HarmoniousDictionary.clean?(content)
  end
end
