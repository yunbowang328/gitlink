class TeamMember < ApplicationRecord
  belongs_to :user

  scope :only_teachers, -> { where(is_teacher: true) }
  scope :without_teachers, -> { where(is_teacher: false) }

  def creator?
    role == 1
  end

  def en_role
    is_teacher? ? 'teacher' : 'member'
  end

  def user_name
    user&.real_name
  end
end
