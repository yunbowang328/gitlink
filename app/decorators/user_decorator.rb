module UserDecorator
  def logged_user?
    User.current.id == id
  end

  def name
    [lastname, firstname].join('')
  end

  # ---------- homepage helper ---------
  def homepage_name
    logged_user? ? real_name : full_name
  end

  # ----------- 账号管理 -------------
  def authentication_status
    if authentication?
      'certified'
    elsif process_real_name_apply.present?
      'applying'
    else
      'uncertified'
    end
  end

  def professional_certification_status
    if professional_certification?
      'certified'
    elsif process_professional_apply.present?
      'applying'
    else
      'uncertified'
    end
  end
end