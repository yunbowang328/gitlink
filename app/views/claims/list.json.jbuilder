json.partial! "commons/success"
json.currentUserclaimed @user_claimed
json.claimers do
  json.array! @claims do |claimer|
    json.partial! "claims/claim_item", claimer: claimer
  end
end