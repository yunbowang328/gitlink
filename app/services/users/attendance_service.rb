class Users::AttendanceService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :user

  def initialize(user)
    @user = user
  end

  def call
    nearly_attendance = Attendance.find_by(user_id: user.id)
    raise Error, '您已签到过了' if nearly_attendance&.today?

    attendance = nil
    ActiveRecord::Base.transaction do
      gold = nearly_attendance&.next_gold || 50

      user.increment!(:grade, gold)

      attendance = user.attendances.create!(score: gold)

      Grade.create!(user_id: user.id, score: gold, container_id: user.id, container_type: 'Attendance')
    end

    attendance
  end
end
