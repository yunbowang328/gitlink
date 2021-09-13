class Notice::Read::ListService < Notice::Read::ClientService 
  attr_accessor :receiver, :type, :status, :page, :size

  def initialize(receiver, type=-1, status=2, page=1, size=15)
    @receiver = receiver
    @type = type 
    @status = status 
    @page = page 
    @size = size
  end

  def call
    result = get(url, request_params)
    response = render_response(result)
  end

  private

  def request_status 
    case status 
    when 1 then 1
    else
      2
    end
  end

  def request_params
    {
      receiver: receiver,
      page: page, 
      show: request_status,
      size: size,
      type: type
    }.stringify_keys
  end

  def url
    "/list".freeze
  end
end