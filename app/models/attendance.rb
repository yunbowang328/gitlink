class Attendance < ApplicationRecord
  belongs_to :user

  default_scope { order(created_at: :desc) }

  def next_gold
    # 超过1天即没有连续的签到则又从10个金币开始累加
    return 50 if Util.days_between(Time.zone.now, created_at) > 1

    [[score.to_i, 50].max + 10, 100].min
  end

  def today?
    Util.days_between(Time.current, created_at).zero?
  end
end
