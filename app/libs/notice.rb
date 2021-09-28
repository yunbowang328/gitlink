module Notice 
  class << self
    def notice_config 
      notice_config = {}

      begin
        config = Rails.application.config_for(:configuration).symbolize_keys!
        notice_config = config[:notice].symbolize_keys!
        raise 'notice config missing' if notice_config.blank?
      rescue => exception
        raise ex if Rails.env.production?

        puts %Q{\033[33m [warning] gitea config or configuration.yml missing,
                 please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
        notice_config = {}
      end

      notice_config 
    end
  end
end