class OpenUsers::Cas < OpenUser
  def nickname
    extra&.[]('nickname')
  end

  def en_type
    'cas'
  end
end