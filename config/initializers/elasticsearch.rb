redis_config = Rails.application.config_for(:elasticsearch)
ENV['ELASTICSEARCH_URL'] = redis_config['url']
