class Ci::Drone::Error < StandardError
  attr_reader :code

  def initialize(code, message)
    super message
    @code = code
  end

  class << self
    def parse(result)
      new(result['errcode'], result['errmsg'])
    end
  end
end
