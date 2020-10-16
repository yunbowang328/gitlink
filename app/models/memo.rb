# root_id：nil => 主贴; 有值 => 主帖的ID（值为帖子的ID）
# parent_id： 回复（对这个id的回复）
# sticky 顶置 1
# is_fine 是否加精，默认为false
# hidden 是否隐藏

class Memo < ApplicationRecord
  include ApplicationHelper, Watchable
  #敏感词过滤
  # include DunCheckAble
  has_many :forums, :through => :memo_forums
  belongs_to :forum_section, counter_cache: true, optional: true
  has_many :memo_forums, :dependent => :destroy
  has_many :visit_actions, as: :visitable, dependent: :destroy
  #用户是否禁言
  has_many :banned_forums
  # has_many_kindeditor_assets :assets, :dependent => :destroy
  has_many :tidings, :as => :container , :dependent => :destroy
  belongs_to :author, :class_name => "User", :foreign_key => 'author_id'
	validates_presence_of :author_id, :subject,:content
	# 若是主题帖，则内容可以是空
	#validates :content, presence: true, if: Proc.new{|o| !o.parent_id.nil? }
	validates_length_of :subject, maximum: 50

  validate :cannot_reply_to_locked_topic, :on => :create
  
  scope :total_replies, ->{where("hidden = false and root_id is not null")}
  # scope :roots, -> {where()}
  has_many :attachments, as: :container, dependent: :destroy
  # 创意征集方式 0-默认，1-申请， ps. 删除后，该帖子即删除， 拒绝后，该帖子状态将为初始状态
  enum destroy_status: { common: 0, apply_destroy: 1 }
	# acts_as_tree :counter_cache => :replies_count, :order => "#{Memo.table_name}.created_at ASC", dependent: :destroy
	# acts_as_attachable
  has_many :user_score_details,  :class_name => 'UserScoreDetails',:as => :score_changeable_obj
  has_many :praise_tread, as: :praise_tread_object, dependent: :destroy
  has_one :praise_tread_cache, as: :object, dependent: :destroy

  # 消息
  has_many :memo_messages, :class_name =>'MemoMessage', :dependent => :destroy
  # end
	belongs_to :last_reply, :class_name => 'Memo', :foreign_key => 'last_reply_id', optional: true
  scope :indexable,lambda {
    where('parent_id is null')
  }
  scope :visible, lambda{where(hidden: false)}
  scope :hidden_memos, lambda{where(hidden: true)}
  scope :field_for_list, lambda{
    select([:id, :subject,:destroy_status, :author_id, :sticky, :published_at, :language, :reward, :replies_count,:is_fine, :viewed_count, :praises_count,:forum_section_id, :tag_id, :is_original])
  }
  scope :field_for_recommend, lambda{select([:id, :subject, :replies_count, :language])}
  scope :user_posts, ->(user_id){where(root_id: nil, author_id: user_id)}
  scope :user_replies, ->(user_id){where("root_id is not null and author_id = ?", user_id)}
  scope :memo_replies, ->(id){where(:root_id => id)}
  scope :hot, lambda{order("replies_count desc")}
  scope :posts, lambda{ where(root_id: nil) }
  scope :recommend_memos, lambda{ where(is_fine: true) }
  scope :in_week, lambda{ where("published_at >= ?",7.days.ago ) }
  scope :related_search_name, -> (name) {ransack(subject_cont: "#{name}").result(distinct: true)}

  scope :order_index, -> (sort_params) {reorder("sticky desc, is_fine desc, #{sort_params} desc")}

  def self.search_by_time(time_type, start_time, end_time)
    where("#{time_type} between ? and ?",start_time.present? ? start_time.to_time : Time.now, end_time.present? ? end_time.to_time.end_of_day : Time.now)
  end
  
  def memo_parent
    Memo.find(parent_id)
  end

  def last_reply_memo(show_hidden_memo)
    memo_children = self.children
    if !show_hidden_memo
      memo_children = memo_children.visible
    end
    memo_children&.reorder("created_at desc")&.first
  end


  def reply_for_memo
    Memo.where(:parent_id => self.id)
  end

  def all_replies
    Memo.where(:root_id => self.id)
  end

  #未审核发布的帖子数
  def uncheck_memo_count
    self&.reply_for_memo&.where(hidden: true).size
  end

  def can_see_reply_count(user)
    memo_replies_count = self.replies_count
    unless user.try(:admin?)
      uncheck_memos_count = self.uncheck_memo_count  #全部未审核的
      user_uncheck_memos_count = self&.reply_for_memo&.where("hidden = true and author_id = ?", user.id)&.size  #当前用户发布的，且未审核的
      memo_replies_count = memo_replies_count - uncheck_memos_count + user_uncheck_memos_count
    end
    memo_replies_count
  end

  def self.hottest_five_memos
    order("replies_count desc, praises_count desc, viewed_count desc").limit(8).select(:id,:subject)
  end

  def self.recommend_five_memos
    recommend_memos.order("updated_at desc").limit(8).select(:id,:subject)
  end


  def send_mail
      # Mailer.run.forum_message_added(self) if Setting.notified_events.include?('forum_message_added')
  end

  def creator_user
    self.author
  end

  def created_time
    self.created_on
  end

  def content_detail
    self.content
  end

  # 公共贴吧消息记录
  # 原则：新帖子给超级管理员发消息
  def send_tiding
    if self.parent_id.present?
      # self.tidings << Tiding.new(:user_id => self.parent.author_id, :trigger_user_id => self.author_id, :parent_container_id => self.root_id, :parent_container_type => "Memo",
      #                            :belong_container_id => self.forum_id, :belong_container_type => "Forum", :viewed => 0, :tiding_type => "Comment")
    else
      self.tidings << Tiding.new(:user_id => 1, :trigger_user_id => self.author_id, :parent_container_id => self.id, :parent_container_type => "Memo", :viewed => 0, :tiding_type => "Comment")
    end
  end

	def cannot_reply_to_locked_topic
		errors.add :base, l(:label_memo_locked) if root.locked? && self != root
	end

	# def update_memos_forum
	# 	if forum_id_changed?
	# 		Message.update_all({:board_id => board_id}, ["id = ? OR parent_id = ?", root.id, root.id ])
	# 		Forum.reset_counters!(forum_id_was)
	# 		Forum.reset_counters!(forum_id)
	# 	end
	# end

	def reset_counters!
		if parent && parent.id
      parent.update_attribute(:last_reply_id, parent.children.maximum(:id))
    end
    if root
      root.update_attribute(:last_reply_id, Memo.where(:root_id => root.id).maximum(:id)) unless root.destroyed?
    end
		forum.reset_counters!
	end

	def sticky?
		sticky == 1
	end

	def replies
	  Memo.where("parent_id = ?", id)
	end

	def locked?
		self.lock
	end

	def editable_by? user
		# user && user.logged? || (self.author == usr && usr.allowed_to?(:edit_own_messages, project))
		user.admin? || self.author == user
	end

	def destroyable_by? user
    (user && self.author == user) || user.admin?  || self.forum.creator == user || Memo.find(self.root_id).author == user
		#self.author == user || user.admin?
	end

	def deleted_attach_able_by? user
		(user && user.logged? && (self.author == user) ) || user.admin?
  end

  def meno_tag_name
    tag_id.to_i == 1 ? "交流" : "求助"
  end

  def update_attachments(attachment_ids)
    Attachment.where(id: attachment_ids).update_all(container_id: id, container_type: "Memo")
  end

	private

	def add_author_as_watcher
		Watcher.create(:watchable => self.root, :user => author)
	end

	def send_notification
		# if Setting.notified_events.include?('message_posted')
		# 	Mailer.run.message_posted(self)
		# end
  end

  # def update_reply_count
  #   if self.root_id
  #     self.root.increment!(:replies_count)
  #   end
  # end

	def plusParentAndForum
		@forum = Forum.find(self.forum_id)
		@forum.memo_count = @forum.memo_count.to_int + 1
		@forum.last_memo_id = self.id
		if self.parent_id
			@parent_memo = Memo.find_by_id(self.parent_id)
			@parent_memo.last_reply_id = self
			@parent_memo.replies_count = @parent_memo.replies_count.to_int + 1
			@parent_memo.save
		else
			@forum.topic_count = @forum.topic_count.to_int + 1
		end
		@forum.save
	end

	def minusParentAndForum
		@forum = Forum.find(self.forum_id)
		@forum.memo_count = @forum.memo_count.to_int - 1
		@forum.memo_count = 0 if @forum.memo_count.to_int < 0
		# @forum.last_memo_id = Memo.reorder('created_at ASC').find_all_by_forum_id(self.forum_id).last.id
		if self.parent_id
			@parent_memo = Memo.find_by_id(self.parent_id)
			# @parent_memo.last_reply_id = Memo.reorder('created_at ASC').find_all_by_parent_id(self.parent_id).last.id
			@parent_memo.replies_count = @parent_memo.replies_count.to_int - 1
			@parent_memo.replies_count = 0 if @parent_memo.replies_count.to_int < 0
			@parent_memo.save
		else
			@forum.topic_count = @forum.topic_count.to_int - 1
			@forum.topic_count = 0 if @forum.topic_count.to_int < 0
		end
		@forum.save
  end

  #更新用户分数     -by zjc
  def  be_user_score
    #新建memo且无parent的为发帖
    if self.parent_id.nil?
      UserScore.joint(:post_message, User.current,nil,self ,{ memo_id: self.id })
      update_memo_number(User.current,1)

      #新建memo且有parent的为回帖
    elsif !self.parent_id.nil?
      UserScore.joint(:reply_posting, User.current,self.parent.author,self, { memo_id: self.id })
      update_replay_for_memo(User.current,1)
    end
  end

  #被删除时更新用户分数
  def down_user_score
    update_memo_number(User.current,1)
    update_replay_for_memo(User.current,1)
  end


  # Time 2015-03-26 15:20:24
  # Author lizanle
  # Description 从硬盘上删除资源
  def delete_kindeditor_assets
      delete_kindeditor_assets_from_disk self.id,OwnerTypeHelper::MEMO
  end

  def create_memo_ealasticsearch_index
    if self.parent_id.nil?
      self.__elasticsearch__.index_document
    end
  end
  def update_memo_ealasticsearch_index
    if self.parent_id.nil?
        self.__elasticsearch__.update_document
    end
  end
  def delete_memo_ealasticsearch_index
    if self.parent_id.nil?
      self.__elasticsearch__.delete_document
    end
  end


end
