class SettingsController < ApplicationController
  def show
    @old_projects_url = nil
    get_add_menu
    get_common_menu
    get_personal_menu
    get_third_party
  end

  private
    def get_add_menu
      @add = []
      Site.add.select(:id, :name, :url, :key).to_a.map(&:serializable_hash).each do |site|
        hash = {}
        site.each {|k, v|
          hash.merge!("#{k}":  get_site_url(k, v))
        }
        @add << hash
      end
    end

    def get_common_menu
      @common = {}
      Site.common.select(:url, :key).each do |site|
        next if site["url"].to_s.include?("current_user") && !User.current.logged?
        @common.merge!("#{site["key"]}": append_http(reset_site_url(site["url"])))
      end
    end

    def get_personal_menu
      @personal = []
      if User.current.logged?
        Site.personal.select(:id, :name, :url, :key).to_a.map(&:serializable_hash).each do |site|
          hash = {}
          site.each {|k, v|
            hash.merge!("#{k}": get_site_url(k, v))
          }
          @personal << hash
        end
      end
    end

    def get_third_party
      @third_party = []
      @third_party << {
        name: 'educoder',
        url: EducoderOauth.oauth_url
      }
    end

    def get_site_url(key, value)
      key.to_s === "url" ? append_http(reset_site_url(value)) : reset_site_url(value)
    end

    def reset_site_url(url)
      return url unless url.to_s.include?("current_user")

      split_arr = url.split('current_user')
      split_arr.length > 1 ? split_arr.join(current_user&.login) : (split_arr << current_user&.login).join('')
    end

    def append_http(url)
      url.to_s.start_with?("http") ? url : [request.protocol, request.host_with_port, url].join('')
    end
end
