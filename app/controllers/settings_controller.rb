class SettingsController < ApplicationController
  def show
    @old_projects_url = nil
    get_add_menu
    get_common_menu
    get_personal_menu

    puts @com
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
      Site.common.select(:url, :key).to_a.map(&:serializable_hash).each do |site|
        next if site["url"].to_s.include?("current_user") && !User.current.logged?
        @common.merge!("#{site["key"]}": reset_site_url(site['url']))
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

    def get_site_url(key, value)
      url = reset_site_url(value)
      key.to_s === "url" && !value.to_s.start_with?("http") ? [request.protocol, request.host_with_port, value].join('') : url
   end

   def reset_site_url(url)
     return url unless url.to_s.include?("current_user")

     split_arr = url.split('current_user')
     split_arr.length > 1 ? split_arr.join(current_user&.login) : (split_arr << current_user&.login).join('')
   end
end
