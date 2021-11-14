# == Schema Information
#
# Table name: topics
#
#  id          :integer          not null, primary key
#  type        :string(255)
#  title       :string(255)
#  uuid        :integer
#  image_url   :string(255)
#  url         :string(255)
#  order_index :integer
#

class Topic < ApplicationRecord

  default_scope { order(order_index: :desc)}

  scope :with_single_type, ->(type){where(type: trans_simpletype_to_classtype(type))}

  def image
    image_url('image')
  end

  def self.trans_simpletype_to_classtype(type)
    case type 
    when 'activity_forum'
      'Topic::ActivityForum'
    when 'banner'
      'Topic::Banner'
    when 'card'
      'Topic::Card'
    when 'cooperator'
      'Topic::Cooperator'
    when 'excellent_project'
      'Topic::ExcellentProject'
    when 'experience_forum'
      'Topic::ExperienceForum'
    when 'pinned_forum'
      'Topic::PinnedForum'
    end
  end

  private

  def image_url(type)
    return nil unless Util::FileManage.exists?(self, type)
    Util::FileManage.source_disk_file_url(self, type)
  end

end
