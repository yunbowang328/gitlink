class Notice::Write::CreateAtmeForm 
  include ActiveModel::Model

  attr_accessor :receivers_login, :atmeable_type, :atmeable_id

  validate :check_receivers

  def check_receivers 
    receivers_login.each do |login|
      receiver = User.find_by(login: login) || User.find_by_id(login)
      raise 'receivers_login值无效.' unless receiver.present?
    end
  end

  def check_atmeable
    begin
      raise 'atmeable对象无效.' unless atmeable_type.constantize.find_by_id(atmeable_id).present?
    rescue => exception
      raise 'atmeable对象无效.' 
    end
  end

end