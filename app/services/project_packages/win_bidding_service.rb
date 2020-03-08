class ProjectPackages::WinBiddingService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :package, :user, :params

  def initialize(package, user, params)
    @package = package
    @user    = user
    @params  = params
  end

  def call
    raise Error, '没有权限' unless package.creator_id == user.id || user.admin_or_business?
    raise Error, '竞标报名还未结束' unless package.bidding_end?
    raise Error, '该状态下不能选择中标者' unless package.may_finish_bidding?

    win_user_ids = Array.wrap(params[:user_ids]).compact.map(&:to_i)
    bidding_user_ids = package.bidding_users.pluck(:user_id)

    win_user_ids = bidding_user_ids & win_user_ids
    raise Error, '请选择中标者' if win_user_ids.blank?

    ActiveRecord::Base.transaction do
      package.finish_bidding!

      # win bidding users
      package.bidding_users.where(user_id: win_user_ids).update_all(status: :bidding_won)
      # lose bidding users
      lost_user_ids = bidding_user_ids - win_user_ids
      package.bidding_users.where(user_id: lost_user_ids).update_all(status: :bidding_lost)

      send_bidding_result_notify!('BiddingWon', win_user_ids)
      send_bidding_result_notify!('BiddingLost', lost_user_ids)
    end

    package
  end

  private

  def send_bidding_result_notify!(type, user_ids)
    columns = %i[user_id trigger_user_id container_id container_type tiding_type created_at updated_at]

    Tiding.bulk_insert(*columns) do |worker|
      base_attr = { trigger_user_id: package.creator_id, container_id: package.id,
                    container_type: 'ProjectPackage', tiding_type: type }
      user_ids.each do |user_id|
        worker.add(base_attr.merge(user_id: user_id))
      end
    end
  end
end