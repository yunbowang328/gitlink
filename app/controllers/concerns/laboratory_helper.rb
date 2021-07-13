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
      new_syllabuses: "https://forge.educoder.net/syllabuses/new",
      new_course: "https://forge.educoder.net/courses/new",
      edit_account: "https://forge.educoder.net/my/account",
      my_courses: "https://forge.educoder.net/users/#{current_user.try(:login)}/user_courselist",
      my_projects: "/users/#{current_user.try(:login)}/projects",
      my_organ: "https://forge.educoder.net/users/#{current_user.try(:login)}/user_organizations",
      default_url: "http://106.75.178.228",
      forge_url: "http://106.75.178.228:81",
      tiding_url: "https://www.educoder.net/users/#{current_user.try(:login)}/user_tidings",
      register_url: "https://www.educoder.net/user/register"
    }
  end
end
