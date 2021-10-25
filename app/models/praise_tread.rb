# == Schema Information
#
# Table name: praise_treads
#
#  id                       :integer          not null, primary key
#  user_id                  :integer          not null
#  praise_tread_object_id   :integer
#  praise_tread_object_type :string(255)
#  praise_or_tread          :integer          default("1")
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#
# Indexes
#
#  praise_tread  (praise_tread_object_id,praise_tread_object_type)
#


class PraiseTread < ApplicationRecord
  belongs_to :user
  belongs_to :praise_tread_object, polymorphic: true, counter_cache: :praises_count
  has_many :tidings, :as => :container, :dependent => :destroy

  after_create :send_tiding
  after_save :reset_cache_data
  after_destroy :reset_cache_data

  def reset_cache_data 
    CacheAsyncResetJob.perform_later("platform_statistic_service")
    if self.praise_tread_object.is_a?(Project)
      CacheAsyncResetJob.perform_later("user_statistic_service", self.praise_tread_object&.user_id)
    end
  end

  def send_tiding
    case self.praise_tread_object_type
      when  "Memo","Message","Issue"
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => self.praise_tread_object.author_id, :parent_container_id => self.praise_tread_object_id, :parent_container_type => self.praise_tread_object_type, :viewed => 0, :tiding_type => "Praise")
      when "Discuss","Challenge","HomeworkCommon","JournalsForMessage","Journal","GraduationTopic","GraduationTask", "Hack"
        self.tidings << Tiding.new(:trigger_user_id => self.user_id, :user_id => self.praise_tread_object.user_id, :parent_container_id => self.praise_tread_object_id, :parent_container_type => self.praise_tread_object_type, :viewed => 0, :tiding_type => "Praise")
    end
  end

  def self.find_object_by_type_and_id(id, type)
    type.constantize find_by_id id
  end

  # 用户是否点赞
  def self.user_praise?(user)
    self.select{|pt| pt.user_id == user.id}.length > 0
  end

end
