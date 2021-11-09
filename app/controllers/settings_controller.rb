class SettingsController < ApplicationController
  def show
    @api_urls = api_urls
  end
end

def api_urls
  navigations = []
  hash = Rails.application.config_for(:configuration)["api_url"]
  hash.each do |key, value|
    navigations << {"#{key}": value}
  end
  navigations
end
