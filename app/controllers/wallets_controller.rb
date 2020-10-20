class WalletsController < ApplicationController
  def balance
    user = User.find_by_id(params[:id])
    user.create_wallet(balance: 0) if user.wallet.nil?
    @wallet = user.wallet
  end

  def coin_changes
    user = User.find_by_id(params[:id])
    user.create_wallet(balance: 0) if user.wallet.nil?
    @wallet = user.wallet
    if params[:category] == 'all'
      scope = CoinChange.where('to_wallet_id = ? OR from_wallet_id = ?', @wallet.id, @wallet.id)
    elsif params[:category] == 'income'
      # @coin_changes = CoinChange.where('to_wallet_id = ?', @wallet.id).limit(100)
      scope = @wallet.income
    elsif params[:category] == 'outcome'
      scope = @wallet.outcome
    end

    sort = params[:sort_by] || "created_at"
    sort_direction = params[:sort_direction] || "desc"
    scope = scope.reorder("#{sort} #{sort_direction}")

    @total = scope.length
    @coin_changes = kaminari_paginate(scope)
  end
end
