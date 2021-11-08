class Forum::Memos::GetService < Forum::ClientService
  attr_reader :memo_id

  def initialize(memo_id)
    @memo_id = memo_id 
  end

  def call 
    response = get(url)
    code, message, body = render_response(response)
    if code == 200 && body["status"] == 0
      return body 
    else 
      return nil
    end
  end

  def url 
    "/memos/#{memo_id}.json".freeze
  end
end