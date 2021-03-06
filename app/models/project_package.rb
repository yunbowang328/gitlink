# == Schema Information
#
# Table name: project_packages
#
#  id                          :integer          not null, primary key
#  creator_id                  :integer
#  status                      :string(255)
#  title                       :string(255)
#  content                     :text(65535)
#  contact_name                :string(255)
#  contact_phone               :string(255)
#  min_price                   :decimal(10, )
#  max_price                   :decimal(10, )
#  visit_count                 :integer          default("0")
#  bidding_users_count         :integer          default("0")
#  deadline_at                 :datetime
#  published_at                :datetime
#  bidding_finished_at         :datetime
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  project_package_category_id :integer
#
# Indexes
#
#  index_project_packages_on_creator_id    (creator_id)
#  index_project_packages_on_published_at  (published_at)
#

class ProjectPackage < ApplicationRecord
  include AASM

  belongs_to :creator, class_name: 'User'
  belongs_to :project_package_category

  has_many :project_package_applies, dependent: :destroy
  has_one :process_project_package_apply, -> { where(status: :pending) }, class_name: 'ProjectPackageApply'

  has_many :bidding_users, dependent: :delete_all
  has_many :win_bidding_users, -> { where(status: :bidding_won) }, class_name: 'BiddingUser'
  has_many :lose_bidding_users, -> { where(status: :bidding_lost) }, class_name: 'BiddingUser'

  has_many :attachments, as: :container, dependent: :destroy

  scope :visible, -> { where(status: %i[published bidding_ended bidding_finished]) }
  scope :invisible, -> { where(status: %i[pending applying refused]) }

  aasm(:status) do
    state :pending, initial: true
    state :applying
    state :refused
    state :published
    state :bidding_ended
    state :bidding_finished

    event :apply do
      transitions from: [:pending, :refused], to: :applying
    end

    event :refuse do
      transitions from: :applying, to: :refused
    end

    event :publish do
      transitions from: :applying, to: :published
    end

    event :end_bidding do
      transitions from: :published, to: :bidding_ended
    end

    event :finish_bidding do
      transitions from: [:bidding_ended], to: :bidding_finished
    end
  end

  def category_name
    project_package_category.name
  end

  def visitable?
    !editable?
  end

  def editable?
    pending? || applying? || refused?
  end

  def deletable?
    pending? || refused?
  end

  def deadline?
    deadline_at < Time.now
  end

  def bidding_end?
    flag = deadline?
    ProjectPackages::EndBiddingService.call(self) if flag && may_end_bidding?
    flag
  end

  def can_bidding?(user)
    published? && !bidding_end? && user.id != creator_id && !bidding_users.exists?(user_id: user.id)
  end

  def status_text
    I18n.t("project_package.status.#{status}")
  end
end
