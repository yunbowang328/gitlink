json.balance @wallet.balance
json.count @total
json.coin_changes do
  json.array! @coin_changes do |coin_change|
    from_user = if coin_change.from_wallet.nil?
                  nil
                else
                  coin_change.from_wallet.user
                end
    to_user = coin_change.to_wallet.user
    json.amount coin_change.amount
    if !from_user.nil?
      json.from_user from_user.full_name
      json.from_user_login from_user.login
    else
      json.from_user '系统'
      json.from_user_login '-'
    end
    json.to_user to_user.full_name
    json.to_user_login to_user.login
    json.description coin_change.description
    json.reason coin_change.reason
    json.date coin_change.created_at.to_date
  end
end
