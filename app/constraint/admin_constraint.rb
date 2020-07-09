class AdminConstraint
  def matches?(request)
    if Rails.env.development?
      true
    else
      laboratory = Laboratory.first
      return false unless request.session[:"#{laboratory.try(:identifier).split('.').first}_user_id"]
      user = User.find request.session[:"#{laboratory.try(:identifier).split('.').first}_user_id"]
      user && user.admin?
    end
    
  end
end