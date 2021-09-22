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

  def request_params
    {
      receiver: receiver,
      page: page, 
      status: status,
      size: size,
      type: type
    }.stringify_keys
  end

  def url
    "/notification/#{platform}/list".freeze
  end
end