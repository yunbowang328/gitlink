json.array! @stopped_sponsorships do |sponsorship|
  json.id sponsorship.id
  json.amount sponsorship.amount
  json.visible sponsorship.visible
  json.sponsor_id sponsorship.sponsor_id
  json.developer_id sponsorship.developer_id
  json.start_time sponsorship.start_time
  json.created_at sponsorship.created_at
  json.updated_at sponsorship.updated_at
  json.accumulate sponsorship.accumulate
end