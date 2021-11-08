module Forum
  class << self
    def forum_config
      forum_config = {}

      begin
        config = Rails.application.config_for(:configuration).symbolize_keys!
        forum_config = config[:forum].symbolize_keys!
        raise 'forum config missing' if forum_config.blank?
      rescue => ex
        raise ex if Rails.env.production?

        puts %Q{\033[33m [warning] forum config or configuration.yml missing,
                 please add it or execute 'cp config/configuration.yml.example config/configuration.yml' \033[0m}
        forum_config = {}
      end
      forum_config
    end
  end
end
