module Register
  class CheckColumnsForm < BaseForm
    attr_accessor :type, :value

    validates :type, presence: true, numericality: true
    validates :value, presence: true
    validate :check!
    
    def check!
      # params[:type] 为事件类型 1：登录名(login) 2：email(邮箱) 3：phone(手机号)
      case strip_type
      when 1 then check_login
      when 2 then check_mail
      when 3 then check_phone
      else raise("type值无效")
      end
    end

    private
    def check_login
      raise("登录名格式有误") unless strip_value =~ CustomRegexp::LOGIN

      login_exist = Owner.exists?(login: strip_value) || ReversedKeyword.check_exists?(strip_value)
      raise('登录名已被使用') if login_exist
    end

    def check_mail
      raise("邮件格式有误") unless strip_value =~ CustomRegexp::EMAIL
  
      mail_exist = Owner.exists?(mail: strip_value)
      raise('邮箱已被使用') if mail_exist
    end
    
    def check_phone
      raise("手机号格式有误") unless strip_value =~ CustomRegexp::PHONE

      phone_exist = Owner.exists?(phone: strip_value)
      raise('手机号已被使用') if phone_exist
    end

    def strip_value
      value&.strip
    end

    def strip_type
      type&.strip.to_i
    end
  end
end
