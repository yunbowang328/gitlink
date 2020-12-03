module Ci::BuildsHelper
  def format_utc_time(unix_time)
    return nil if unix_time == 0
    Time.at(unix_time).strftime("%Y-%m-%d %H:%M")
  end

  def render_duartion_time(end_time, start_time)
    return nil if end_time == 0 || start_time == 0
    game_spend_time(end_time - start_time)
  end
end
