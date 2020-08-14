class OpenUsers::EduCoder < OpenUser
  def nickname
    extra&.[]('nickname')
  end

  def en_type
    'educoder'
  end
end
