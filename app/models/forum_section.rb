class ForumSection < ApplicationRecord
  has_ancestry
  #论坛板块的表
  # attr_accessible :title, :body
  has_many :forum_moderators
  belongs_to :user
  has_many :apply_forums, dependent: :destroy
  has_many :memo_forums, :dependent => :destroy, foreign_key: "forum_id"
  has_many :memos, dependent: :destroy
  has_one :section_notice, dependent: :destroy
  # scope :group_today, -> {joins(:memos).where("memos.hidden = false and memos.created_at between ? and ?", Time.current.beginning_of_day, Time.current.end_of_day)}
  # acts_as_watchable
  # acts_as_attachable

  def group_today
    memos.where("memos.hidden = false and memos.created_at between ? and ?", Time.current.beginning_of_day, Time.current.end_of_day)
  end

  def visible_memos_count
    memos.posts.visible.size
  end

  def image_attachment
    Attachment.find_by_id(attachment_id)
  end

  def children_forum
    ForumSection.where(parent_id: id)
  end

  def parent_forum
    ForumSection.find_by_id(parent_id)
  end

  def get_children_section(type)
    children.order("position #{type}")
    # ForumSection.where(parent_id: id).order("position #{type}")
  end

end
