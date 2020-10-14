class PraiseTread < ApplicationRecord
  belongs_to :user
  belongs_to :praise_tread_object, polymorphic: true, counter_cache: :praises_count
  has_many :tidings, :as => :container, :dependent => :destroy

  after_create :send_tiding

  def send_tiding
    case self.praise_tread_object_type
      when  "Memo","Message","Issue"
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => self.praise_tread_object.author_id, :parent_container_id => self.praise_tread_object_id, :parent_container_type => self.praise_tread_object_type, :viewed => 0, :tiding_type => "Praise")
      when "Discuss","Challenge","HomeworkCommon","JournalsForMessage","Journal","GraduationTopic","GraduationTask", "Hack"
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => self.praise_tread_object.user_id, :parent_container_id => self.praise_tread_object_id, :parent_container_type => self.praise_tread_object_type, :viewed => 0, :tiding_type => "Praise")
    end
  end

  def self.is_user_praise(target_id,target_type,  target_user_id)
    where(:praise_tread_object_id => target_id, :praise_tread_object_type => target_type, :user_id => target_user_id, :praise_or_tread => 1)
  end

  def self.find_object_by_type_and_id(id, type)
    type.constantize find_by_id id
  end

  # 用户是否点赞
  def self.user_praise?(user)
    self.select{|pt| pt.user_id == user.id}.length > 0
  end

end
