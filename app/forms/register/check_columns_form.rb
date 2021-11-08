module Register
  class CheckColumnsForm < Register::BaseForm
    attr_accessor :type, :value

    validates :type, presence: true, numericality: true
    validates :value, presence: true
    validate :check!
    
    def check!
      # params[:type] 为事件类型 1：登录名(login) 2：email(邮箱) 3：phone(手机号)
      case strip(type).to_i
      when 1 then check_login(strip(value))
      when 2 then check_mail(strip(value))
      when 3 then check_phone(strip(value))
      else raise("type值无效")
      end
    end
  end
end
