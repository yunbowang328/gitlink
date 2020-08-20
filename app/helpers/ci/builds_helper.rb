module Ci::BuildsHelper
  def format_utc_time(unix_time)
    Rails.logger.info "00000000000000 #{unix_time}"
    DateTime.strptime(unix_time.to_s,'%s').strftime("%Y-%m-%d %H:%M")
  end

  def render_duartion_time(end_time, start_time)
    (end_time - start_time) / 10000
  end
end
