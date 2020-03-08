class RewardGradeService < ApplicationService
  attr_reader :user, :attrs, :not_unique

  def initialize(user, **attrs)
    @user  = user
    @not_unique = attrs.delete(:not_unique) || false
    @attrs = attrs.slice(*%i[container_id container_type score])
  end

  def call
    return if user.grades.exists?(attrs) && !not_unique

    ActiveRecord::Base.transaction do
      grade = user.grades.create!(attrs)

      user.increment!(:grade, grade.score)
    end
  end
end