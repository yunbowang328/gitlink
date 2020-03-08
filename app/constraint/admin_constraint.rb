class AdminConstraint
  def matches?(request)
    laboratory = Laboratory.first
    return false unless request.session[:"#{laboratory.try(:identifier).split('.').first}_user_id"]
    user = User.find request.session[:"#{laboratory.try(:identifier).split('.').first}_user_id"]
    user && user.admin?
  end
end