json.(experience_forum, :id, :title, :url)
request_memo = Forum::Memos::GetService.call(experience_forum&.uuid)
json.visits request_memo.nil? ? 0 : request_memo["memo"]["viewed_count"]
json.created_time request_memo.nil? ? format_time(Time.now) : request_memo["memo"]["published_time"] 