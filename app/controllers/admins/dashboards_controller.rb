class Admins::DashboardsController < Admins::BaseController
  def index
    @active_user_count = User.where(last_login_on: today).count
    @weekly_active_user_count = User.where(last_login_on: current_week).count
    @month_active_user_count = User.where(last_login_on: current_month).count

    @new_user_count = User.where(created_on: current_month).count
  end

  def month_active_user
    count = UserExtension.where(created_at: current_month).group(:identity).count

    data = [
      { value: count['teacher'].to_i, name: '老师' },
      { value: count['student'].to_i, name: '学生' },
      { value: count['professional'].to_i, name: '专业人士' },
      { value: count[nil].to_i, name: '未选职业' },
    ]

    render_ok(data: data)
  end

  def evaluate
    names = []
    data = []

    1.upto(7) do |i|
      date = i.days.ago
      names.unshift(date.strftime('%Y-%m-%d'))

      count = Output.where(created_at: date.beginning_of_day..date.end_of_day).count
      data.unshift(count)
    end

    render_ok(names: names, data: data)
  end

  private

  def today
    Time.now.beginning_of_day..Time.now.end_of_day
  end

  def current_week
    7.days.ago.beginning_of_day..Time.now.end_of_day
  end

  def current_month
    30.days.ago.beginning_of_day..Time.now.end_of_day
  end
end