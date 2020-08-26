module Ci::BuildsHelper
  def format_utc_time(unix_time)
    return nil if unix_time == 0
    DateTime.strptime(unix_time.to_s,'%s').strftime("%Y-%m-%d %H:%M")
  end

  def render_duartion_time(end_time, start_time)
    return nil if end_time == 0 || state_time == 0
    game_spend_time(end_time - start_time)
  end
end
