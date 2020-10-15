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
      new_syllabuses: "https://www.trustie.net/syllabuses/new",
      new_course: "https://www.trustie.net/courses/new",
      edit_account: "https://www.trustie.net/my/account",
      my_courses: "https://www.trustie.net/users/#{current_user.try(:login)}/user_courselist",
      my_projects: "https://testforgeplus.trustie.net/users/#{current_user.try(:login)}/projects",
      my_organ: "https://www.trustie.net/users/#{current_user.try(:login)}/user_organizations",
      default_url: "https://www.trustie.net/",
      tiding_url: "https://www.trustie.net/users/#{current_user.try(:login)}/user_messages",
      register_url: "https://www.trustie.net/login?login=false"
    }
  end
end
