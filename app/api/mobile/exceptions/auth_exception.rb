#coding=utf-8
#
module Mobile
  module Exceptions
    class AuthException < StandardError
      attr_reader :err_code, :msg
      def initialize(code, msg)
        @err_code = code
        @msg = msg
      end
    end
  end
end
