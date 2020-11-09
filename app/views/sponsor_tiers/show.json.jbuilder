json.tier do
  json.partial! "sponsor_tiers/sponsor_tier", sponsor_tier: @sponsor_tier
end
if @check_sponsorship.length.zero?
  json.is_sponsoring false
else
  json.is_sponsoring true
  json.sponsorship_id @check_sponsorship[0].id
end
