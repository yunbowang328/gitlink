json.id @public_key["id"]
json.name @public_key["title"]
json.content @public_key["key"]
json.fingerprint @public_key["fingerprint"]
json.created_time @public_key["created_at"].to_time.strftime("%Y/%m/%d %H:%M")