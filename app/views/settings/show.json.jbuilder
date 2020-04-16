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
  #   json.main_site current_laboratory.main_site?
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

  json.navbar default_setting.navbar

  json.footer default_setting.footer

  json.main_site current_laboratory.main_site?
  json.new_course default_course_links


end