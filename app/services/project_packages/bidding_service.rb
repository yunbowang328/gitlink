class ProjectPackages::BiddingService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :package, :user

  def initialize(package, user)
    @package = package
    @user    = user
  end

  def call
    raise Error, '竞标已截止' if package.bidding_end?
    raise Error, '不能参与自己发布的竞标' if package.creator_id == user.id
    raise Error, '您已参与竞标' if package.bidding_users.exists?(user_id: user.id)

    ActiveRecord::Base.transaction do
      package.bidding_users.create!(user_id: user.id)

      send_bidding_notify!
    end
  end

  private

  def send_bidding_notify!
    Tiding.create!(user_id: package.creator_id, trigger_user_id: user.id,
                   container_id: package.id, container_type: 'ProjectPackage', tiding_type: 'Bidding')
  end
end