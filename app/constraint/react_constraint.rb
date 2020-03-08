class ReactConstraint


  def matches?(request)
    # stuff
    #
    !File.exists?(File.join(Rails.root, "public", request.fullpath.split('?').first))
  end


end