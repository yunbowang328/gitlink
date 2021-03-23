class SettingsController < ApplicationController
  def show
    @old_projects_url = nil
    @old_projects_url = "https://www.trustie.net/users/#{current_user.try(:login)}/projects"  if User.current.logged?

    @add =  Site.add
    @personal =
      if User.current.logged?
        arr =[]
        Site.personal.select(:id, :name, :url, :key).to_a.map(&:serializable_hash).each do |site|
          hash = {}
          site.each {|k, v|
            hash.merge!("#{k}":  v.to_s.include?("current_user") ? v.split('current_user').join(current_user&.login) : v)
          }
          arr << hash
        end
      else
        []
      end
    # @sites = Site.group(:site_type).select(:name, :url, :key)
  end
end
