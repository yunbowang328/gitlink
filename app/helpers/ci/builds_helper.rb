module Ci::BuildsHelper
  def format_utc_time(unix_time)
    Rails.logger.info "00000000000000 #{unix_time}"
    return nil if unix_time.blank?
    DateTime.strptime(unix_time.to_s,'%s').strftime("%Y-%m-%d %H:%M")
  end

  def render_duartion_time(end_time, start_time)
    return nil if end_time == 0
    game_spend_time(end_time - start_time)
  end
end
