# == Schema Information
#
# Table name: laboratory_settings
#
#  id            :integer          not null, primary key
#  laboratory_id :integer
#  config        :text(65535)
#
# Indexes
#
#  index_laboratory_settings_on_laboratory_id  (laboratory_id)
#

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
        { 'name' => '首页', 'link' => '/projects',        'hidden' => false },
        { 'name' => '课程', 'link' => '/courses',      'hidden' => false },
        { 'name' => '项目', 'link' => '',      'hidden' => true },
        { 'name' => '数据', 'link' => '/datas', 'hidden' => false },
        { 'name' => '竞赛', 'link' => '/competitions',   'hidden' => false },
        { 'name' => '问吧', 'link' => '/forums',       'hidden' => false },
        { 'name' => '开源社区', 'link' => '/projects',       'hidden' => false },
      ],
      footer: nil
    }
  end
end
