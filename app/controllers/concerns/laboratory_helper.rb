module LaboratoryHelper
  extend ActiveSupport::Concern

  included do
    before_action :setup_laboratory

    helper_method :current_laboratory
    helper_method :default_setting
    helper_method :default_yun_session
    helper_method :default_course_links
  end

  def current_laboratory
    @_current_laboratory ||= (Laboratory.find_by_subdomain(request.subdomain) || Laboratory.find(1))
  end

  def default_laboratory
    @_default_laboratory ||= Laboratory.find(1)
  end

  def default_setting
    @_default_setting ||= LaboratorySetting.find_by(laboratory_id: 1)
  end

  def setup_laboratory
    Laboratory.current = current_laboratory
  end

  def default_yun_session
    laboratory ||= (Laboratory.find_by_subdomain(request.subdomain) || Laboratory.find(1))
    @_default_yun_session = "#{laboratory.try(:identifier).split('.').first}_user_id"
  end

  def default_course_links
    # my_projects: "/users/#{current_user.try(:login)}/projects",
    #       my_projects: "https://www.trustie.net/users/#{current_user.try(:login)}/user_projectlist",
    {
      new_syllabuses: "#{Rails.application.config_for(:configuration)['platform_url']}/syllabuses/new",
      new_course: "#{Rails.application.config_for(:configuration)['platform_url']}/courses/new",
      edit_account: "#{Rails.application.config_for(:configuration)['platform_url']}/my/account",
      my_courses: "#{Rails.application.config_for(:configuration)['platform_url']}/users/#{current_user.try(:login)}/user_courselist",
      my_projects: "#{Rails.application.config_for(:configuration)['platform_url']}/users/#{current_user.try(:login)}/projects",
      my_organ: "#{Rails.application.config_for(:configuration)['platform_url']}/users/#{current_user.try(:login)}/user_organizations",
      default_url: Rails.application.config_for(:configuration)['platform_url'],
      tiding_url: "#{Rails.application.config_for(:configuration)['platform_url']}/settings/notice",
      register_url: "#{Rails.application.config_for(:configuration)['platform_url']}/login?login=false"
    }
  end
end
