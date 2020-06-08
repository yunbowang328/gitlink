class Gitea::ChainService < ApplicationService
  attr_reader :url, :params

  def initialize(options={})
    @url      = options[:url]
    @params   = options[:params]
  end

  def post(url, params={})
    Rails.logger.info("######_____api____request_url_______###############{request_url}")
    Rails.logger.info("######_____api____request_params_______###############{params}")

    conn.post do |req|
      req.url "#{request_url}"
      req.body = params[:data].to_json
    end
  end

  def get(url, params={})
    conn.get do |req|
      req.url = "#{request_url}"
      req.body = params[:data].to_json
    end
  end

  private
  def conn(auth={})
    @client ||= begin
      Faraday.new(url: domain) do |req|
        req.request :url_encoded
        req.headers['Content-Type'] = 'application/json'
        req.response :logger # 显示日志
        req.adapter Faraday.default_adapter
      end
    end
    @client
  end

  def domain
    Rails.application.config_for(:configuration)['chain_base']
  end

  def request_url
    [domain, url].join('').freeze
  end

end
