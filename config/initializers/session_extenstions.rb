#coding=utf-8

module  SessionExtenstions

  module EntryExtension
    def compressed?
      @compressed
    end

    def value
      if @value
        begin
          Marshal.load(compressed? ? Zlib::Inflate.inflate(@value) : @value)
        rescue TypeError
          compressed? ? Zlib::Inflate.inflate(@value) : @value
        end
      end
    end

    def size
      if @value.nil?
        0
      else
        @value.bytesize
      end
    end
  end


end

ActiveSupport::Cache::Entry.const_set("DEFAULT_COMPRESS_LIMIT", 1)
ActiveSupport::Cache::Entry.send(:prepend, SessionExtenstions::EntryExtension)
