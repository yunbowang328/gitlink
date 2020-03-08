class ProjectPackages::EndBiddingService < ApplicationService
  attr_reader :package

  def initialize(package)
    @package = package
  end

  def call
    return unless package_deadline?

    package.end_bidding!

    send_bidding_end_notify!
  end

  private

  def send_bidding_end_notify!
    Tiding.create!(user_id: package.creator_id, trigger_user_id: 0,
                   container_id: package.id, container_type: 'ProjectPackage', tiding_type: 'BiddingEnd')
  end

  def package_deadline?
    package.may_end_bidding? && package.deadline_at < Time.now
  end
end