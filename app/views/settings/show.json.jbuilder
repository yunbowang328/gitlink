json.setting do
  # if @laboratory.present?
  #   setting = @laboratory.laboratory_setting
  #   json.name setting.name || default_setting.name
  #   json.nav_logo_url (setting.nav_logo_url || default_setting.nav_logo_url)&.[](1..-1)
  #   json.login_logo_url (setting.login_logo_url || default_setting.login_logo_url)&.[](1..-1)
  #   json.tab_logo_url (setting.tab_logo_url || default_setting.tab_logo_url)&.[](1..-1)
  #
  #   json.subject_banner_url (setting.subject_banner_url || default_setting.subject_banner_url)&.[](1..-1)
  #   json.course_banner_url (setting.course_banner_url || default_setting.course_banner_url)&.[](1..-1)
  #   json.competition_banner_url (setting.competition_banner_url || default_setting.competition_banner_url)&.[](1..-1)
  #   json.moop_cases_banner_url (setting.moop_cases_banner_url || default_setting.moop_cases_banner_url)&.[](1..-1)
  #   json.oj_banner_url (setting.oj_banner_url || default_setting.oj_banner_url)&.[](1..-1)
  #
  #   json.navbar setting.navbar || default_setting.navbar
  #
  #   json.footer setting.footer || default_setting.footer
  #
  # end

  nav_bar = default_setting.navbar

  # if User.current.logged?
  #   nav_bar[2]["link"] = "https://forgeplus.trustie.net/users/#{current_user.login}/projects"
  #   nav_bar[2]["hidden"] = false
  # else
  #   nav_bar[2]["link"] = ""
  #   nav_bar[2]["hidden"] = true
  # end

  json.name default_setting.name
  json.nav_logo_url default_setting.nav_logo_url&.[](1..-1)
  json.login_logo_url default_setting.login_logo_url&.[](1..-1)
  json.tab_logo_url default_setting.tab_logo_url&.[](1..-1)

  json.subject_banner_url default_setting.subject_banner_url&.[](1..-1)
  json.course_banner_url default_setting.course_banner_url&.[](1..-1)
  json.competition_banner_url default_setting.competition_banner_url&.[](1..-1)
  json.moop_cases_banner_url default_setting.moop_cases_banner_url&.[](1..-1)
  json.oj_banner_url default_setting.oj_banner_url&.[](1..-1)

  json.navbar nav_bar

  json.footer default_setting.footer

  json.main_site current_laboratory.main_site?
  json.new_course default_course_links
  json.old_projects_url @old_projects_url

  json.add do
    json.array! @add, :name, :url, :key
  end
  
  json.personal do
    json.array! @personal, :name, :url, :key
  end

end
