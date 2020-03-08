class LaboratorySetting < ApplicationRecord
  belongs_to :laboratory

  serialize :config, JSON

  %i[name navbar footer].each do |method_name|
    define_method method_name do
      config&.[](method_name.to_s)
    end

    define_method "#{method_name}=" do |value|
      self.config ||= {}
      config.[]=(method_name.to_s, value)
    end
  end

  def login_logo_url
    image_url('login')
  end

  def nav_logo_url
    image_url('nav')
  end

  def tab_logo_url
    image_url('tab')
  end

  def subject_banner_url
    image_url('_subject_banner')
  end

  def course_banner_url
    image_url('_course_banner')
  end

  def competition_banner_url
    image_url('_competition_banner')
  end

  def moop_cases_banner_url
    image_url('_moop_cases_banner')
  end

  def oj_banner_url
    image_url('_oj_banner')
  end

  def default_navbar
    self.class.default_config[:navbar]
  end

  private

  def image_url(type)
    return nil unless Util::FileManage.exists?(self, type)
    Util::FileManage.source_disk_file_url(self, type)
  end

  def self.default_config
    {
      name: nil,
      navbar: [
        { 'name' => '实践课程', 'link' => '/paths',        'hidden' => false },
        { 'name' => '翻转课堂', 'link' => '/courses',      'hidden' => false },
        { 'name' => '实训项目', 'link' => '/shixuns',      'hidden' => false },
        { 'name' => '在线竞赛', 'link' => '/competitions', 'hidden' => false },
        { 'name' => '教学案例', 'link' => '/moop_cases',   'hidden' => false },
        { 'name' => '交流问答', 'link' => '/forums',       'hidden' => false },
        { 'name' => '开发者社区', 'link' => '/problems',       'hidden' => false },
      ],
      footer: nil
    }
  end
end