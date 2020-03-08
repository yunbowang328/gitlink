module ProjectDecorator
  def can_visited?
    is_public? || User.current.admin? || member?(User.current)
  end
end
