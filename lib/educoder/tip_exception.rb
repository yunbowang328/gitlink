module Educoder

  class TipException < StandardError
    attr_reader :status, :message

    def initialize(status=-1, message)
      case status
        when 403
          message = "您没有权限进行该操作"
        when 404
          message = "您访问的页面不存在或已被删除"
      end
      @status = status
      @message = message

      Rails.logger.error("############# #{@status}, #{@message}")
    end

    def tip_json
      {status: self.status, message: self.message}
    end
  end

end