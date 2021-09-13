class Notice::Read::CountService < Notice::Read::ClientService 
  attr_accessor :receiver, :type
  
  def initialize(receiver, type=-1)
    @receiver = receiver
    @type = type 
  end

  def call
    result = get(url, request_params)
    response = render_response(result)
  end

  private
  def request_params
    {
      receiver: receiver,
      type: type
    }.stringify_keys
  end

  def url
    "/count".freeze
  end
end