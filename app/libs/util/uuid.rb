module Util
  module UUID
    module_function

    DCODES = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)

    def time_uuid(format: '%Y%m%d%H%M%S', suffix: 8)
      "#{Time.zone.now.strftime(format)}#{Random.rand(10**suffix).to_i}"
    end

    # 随机生成字符
    def generate_identifier(container, num, pre='')
      code = DCODES.sample(num).join
      if container == User
        while container.exists?(login: pre+code) do
          code = DCODES.sample(num).join
        end
      else
        while container.exists?(identifier: code) do
          code = DCODES.sample(num).join
        end
      end
      code
    end

  end
end
