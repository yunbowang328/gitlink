class Base64ImageConverter
  # BASE64_HEAD = 'data:image/jpeg;base64,'.freeze
  BASE64_HEAD_ARRAY = ['data:image/jpeg;base64,', 'data:image/jpg;base64,',
    'data:image/png;base64,', 'data:image/gif;base64,']

  Error         = Class.new(StandardError)
  OutLimit      = Class.new(Error)
  InvalidData   = Class.new(Error)
  InvalidFormat = Class.new(Error)

  attr_reader :opts

  def initialize(**opts)
    @opts = opts
  end

  def convert(data)
    raise InvalidData, '不合法的Base64数据' unless valid_base64?(data)

    io = StringIO.new(Base64.decode64(image_data data))

    raise OutLimit, '文件大小超过限制' if opts[:max_size].present? && io.size > opts[:max_size]

    raise InvalidFormat, '无效的格式' unless Image.new(io).image?

    io
  end

  private

  def valid_base64?(data)
    # data&.start_with?(BASE64_HEAD)
    BASE64_HEAD_ARRAY.include? base64_head_data(data)
  end

  def base64_head_data(data)
    data&.split(',')[0] + ','
  end

  def base64_head(data)
    valid_base64?(data) ? base64_head_data(data) : ''
  end

  def image_data(data)
    data[base64_head(data).size..-1]
  end

  def size_limit
    EduSetting.get('upload_avatar_max_size')
  end

  class Image
    attr_reader :io

    def initialize(io)
      raise ArgumentError unless io.respond_to?(:read)
      @io = io
    end

    def data
      @_data ||= begin
        data = io.read(9)
        io.rewind
        data
      end
    end

    def image?
      bitmap? || gif? || jpeg? || png?
    end

    def bitmap?
      data[0,2] == 66.chr + 77.chr
    end

    def gif?
      data[0,4] == 71.chr + 73.chr + 70.chr + 56.chr
    end

    def jpeg?
      data[0,3] == 0xff.chr + 0xd8.chr + 0xff.chr
    end

    def png?
      data[0,2] == 0x89.chr + 80.chr
    end
  end
end
