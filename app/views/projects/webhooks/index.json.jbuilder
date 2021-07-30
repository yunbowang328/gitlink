json.total_count @webhooks.total_count 
json.webhooks @webhooks.each do |webhook|
  json.partial! 'detail', webhook: webhook
end