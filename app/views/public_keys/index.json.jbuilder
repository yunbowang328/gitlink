json.total_count @public_keys.total_count 
json.public_keys @public_keys do |public_key|
  json.(public_key, :id, :name, :content, :fingerprint, :created_unix)
  json.created_time Time.at(public_key.created_unix).strftime("%Y/%m/%d %H:%M")
end