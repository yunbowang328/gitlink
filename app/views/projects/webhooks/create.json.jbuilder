json.id @webhook["id"]
json.type @webhook["type"]
json.content_type @webhook["config"]["content_type"]
json.url @webhook["config"]["url"]
json.events @webhook["events"]
json.active @webhook["active"]
json.create_time @webhook["created_at"].to_time.strftime("%Y-%m-%d %H:%M:%S")