# == Schema Information
#
# Table name: discusses
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  dis_type        :string(255)
#  dis_id          :integer
#  content         :text(65535)
#  parent_id       :integer
#  root_id         :integer
#  praise_count    :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  challenge_id    :integer
#  reward          :integer
#  hidden          :boolean          default("0")
#  last_reply_id   :integer
#  position        :integer
#  praises_count   :integer          default("0")
#  sticky          :boolean          default("0")
#  course_sticky   :boolean          default("0")
#  course_hidden   :boolean          default("0")
#  copy_message_id :integer
#
# Indexes
#
#  index_discusses_on_challenge_id         (challenge_id)
#  index_discusses_on_copy_message_id      (copy_message_id)
#  index_discusses_on_course_hidden        (course_hidden)
#  index_discusses_on_course_sticky        (course_sticky)
#  index_discusses_on_dis_id_and_dis_type  (dis_id,dis_type)
#  index_discusses_on_user_id              (user_id)
#

class Discuss < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :user
  belongs_to :parent, class_name: 'Discuss', foreign_key: :parent_id, optional: true

  has_many :children, -> { reorder(created_at: :asc) }, class_name: 'Discuss', foreign_key: :parent_id
  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_many :tidings, as: :container, dependent: :destroy
  has_one :praise_tread_cache, as: :object, dependent: :destroy
  belongs_to :dis, polymorphic: true

  belongs_to :challenge, optional: true
  validate :validate_sensitive_string

  validates :content, length: { maximum: 2000, too_long: "不能超过2000个字符" }

  after_create :send_tiding

  scope :children, -> (discuss_id){ where(parent_id: discuss_id).includes(:user).reorder(created_at: :asc) }

  def has_parent?
    parent_id.present?
  end

  def username
    user.full_name
  end

  def can_deleted?(user)
    user.admin? || user.id == user_id
  end

  def game_url(shixun, user)
    return '' unless shixun.has_manager?(user)

    game = Game.joins(:challenge).where(challenges: { shixun_id: shixun.id, position: position || 1 })
             .select(:identifier).find_by(user_id: user_id)
    "/tasks/#{game&.identifier}"
  end

  # def contents(shixun, user)
  #   return content unless hidden?
  #
  #   shixun.has_manager?(user) ? content : ''
  # end

  def child_discuss(user)
    Discuss.where(parent_id: self.id).includes(:user).reorder(created_at: :asc)
  end

  def child_discuss_count
    Discuss.where(root_id: id).count
  end

  private

  def send_tiding
    if dis_type == 'Shixun'
      send_user_id = has_parent? ? parent.user_id : Challenge.find(challenge_id).user_id
      parent_container_type = 'Challenge'
      challenge_id = challenge_id
      extra = ''
    elsif dis_type == 'Hack'
      send_user_id = has_parent? ? parent.user_id : Hack.find(dis_id).user_id
      parent_container_type = 'Hack'
      challenge_id = dis_id
      extra = HackUserLastestCode.where(user_id: user_id, hack_id: dis_id).first&.identifier
    end
    base_attrs = {
        trigger_user_id: user_id, parent_container_id: challenge_id, parent_container_type: parent_container_type,
        belong_container_id: dis_id, belong_container_type: dis_type, viewed: 0, tiding_type: 'Comment', extra: extra
    }
    tidings.create!(base_attrs.merge(user_id: send_user_id))
  end

  def validate_sensitive_string
    raise("内容包含敏感词汇，请重新输入") unless HarmoniousDictionary.clean?(content)
  end
end
