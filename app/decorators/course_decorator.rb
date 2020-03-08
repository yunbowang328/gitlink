module CourseDecorator
  def can_visited?
    is_public == 1 || User.current.admin_or_business? || User.current.member_of_course?(self)
  end
end