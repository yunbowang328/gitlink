class OpenUsers::Wechat < OpenUser
  def nickname
    extra&.[]('nickname')
  end

  def en_type
    'wechat'
  end
end