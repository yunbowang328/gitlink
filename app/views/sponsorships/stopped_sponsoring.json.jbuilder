json.count @total
json.sponsorships do
  json.array! @stopped_sponsorships do |sponsorship|
    json.id sponsorship.id
    json.start_time sponsorship.start_time.to_date
    json.stop_time sponsorship.created_at.to_date
    if sponsorship.visible.zero?
      json.visible false
    else
      json.visible true
    end
    json.amount sponsorship.amount
    sponsor = sponsorship.developer
    json.image_url url_to_avatar(sponsor)
    json.username sponsor.full_name
    json.user_id sponsor.id
    json.login sponsor.login
    json.accumulate sponsorship.accumulate
    json.sponsor_id sponsorship.sponsor.id
  end
end