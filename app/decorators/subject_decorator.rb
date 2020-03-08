module SubjectDecorator
  def can_visited?
    published? || User.current.admin? || member?(User.current)
  end
end