class Message < ApplicationRecord
  attr_accessor :total_replies_count

  belongs_to :board, counter_cache: true
  belongs_to :author, class_name: "User", foreign_key: 'author_id'
  belongs_to :parent, class_name: "Message", foreign_key: "parent_id", counter_cache: :replies_count, optional: true
  belongs_to :root, class_name: 'Message', foreign_key: :root_id, counter_cache: :descendants_count, optional: true

  has_one :message_detail, dependent: :destroy
  accepts_nested_attributes_for :message_detail, update_only: true

  has_many :children, -> { order(updated_on: :desc ) }, class_name: "Message", foreign_key: "parent_id", dependent: :destroy
  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_many :tidings, as: :container, dependent: :destroy
  has_many :attachments, as: :container, dependent: :destroy
  has_many :course_acts, :class_name => 'CourseActivity',:as =>:course_act ,:dependent => :destroy # 课程动态
  has_many :descendants, class_name: 'Message', foreign_key: :root_id, dependent: :destroy

  scope :root_nodes,       -> { where("parent_id IS NULL") }   #判断该信息是帖子还是回复。null为发布的帖子
  scope :reply_nodes,      -> { where("parent_id IS NOT NULL") }
  scope :visible,          -> { where(is_hidden: false) }
  scope :by_user,          ->(user) { visible if user.nil? || !user.admin? }
  scope :preload_messages, -> { includes(:author, :message_detail) }
  scope :short,            -> { select(:id, :subject, :created_on, :replies_count, :visits, :sticky, :praises_count) }
  scope :ordered,          -> (opts={}) { reorder("created_on #{opts[:sort] == 1 ? 'asc': 'desc'}") }
  scope :by_ids, lambda { |ids| where(id: ids) unless ids.blank? }
  scope :find_by_boards,   ->(ids) {where(board_id: ids)}
  scope :by_keywords, lambda { |keywords|
    where("subject LIKE ?", "%#{keywords.split(" ").join('|')}%") unless keywords.blank?
  }


  #转发表
  # has_many :forwards, as: :from, dependent: :destroy

  validates :subject, length: { maximum: 255, too_long: "不能超过255个字符" }

  def update_content(content)
    message_detail.update_attributes(content: content)
  end

  # 主贴的名称
  def main_subject
    Rails.logger.info("##########parent: #{parent&.subject}")
    parent.present? ? parent.subject : subject
  end

  def copy_attachments_to_new_message(new_message, user)
    attachments.each do |attach|
      new_message.attachments << Attachment.new(attach.attributes.except("id").merge(
          quotes: 0,
          downloads: 0,
          author_id: user.id,
          created_on: Time.now
      ))
    end
  end

  def self.bulk_move_to_other_board(message_ids, to_board_id)
    to_board = Board.find(to_board_id)

    messages = Message.where(id: message_ids, parent_id: nil).select(:id, :board_id).to_a
    return if messages.blank?

    from_board = Board.find(messages.first.board_id)

    root_ids = messages.map(&:id)
    children_ids = Message.where(parent_id: root_ids).pluck(:id)
    second_children_ids = Message.where(parent_id: children_ids).pluck(:id)

    ids = root_ids.concat(children_ids).concat(second_children_ids).uniq

    ActiveRecord::Base.transaction do
      Message.where(id: ids, board_id: from_board.id).update_all(board_id: to_board.id)
      to_board.increment!(:messages_count, ids.size)
      from_board.increment!(:messages_count, - ids.size)
    end
  end

  # 包含二级回复的总点赞数
  def total_praises_count
    praises_count + descendants.sum(:praises_count)
  end

  # 包含二级回复数的总回复数
  def total_replies_count
    descendants_count
  end

  def has_replies
    children.exists?
  end

  #
  def by_user_with_visible(user)
    user.nil? || !user.admin? ? children.visible.limit(5) : children.limit(5)
  end

  def update_visits
    update_attributes(:visits => visits + 1)
  end
end
