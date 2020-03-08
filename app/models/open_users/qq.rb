class OpenUsers::QQ < OpenUser
  def nickname
    extra&.[]('nickname')
  end

  def en_type
    'qq'
  end
end