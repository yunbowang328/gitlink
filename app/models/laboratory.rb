# == Schema Information
#
# Table name: laboratories
#
#  id           :integer          not null, primary key
#  school_id    :integer
#  identifier   :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  sync_course  :boolean          default("0")
#  sync_subject :boolean          default("0")
#  sync_shixun  :boolean          default("0")
#  is_local     :boolean          default("0")
#
# Indexes
#
#  index_laboratories_on_identifier  (identifier) UNIQUE
#  index_laboratories_on_school_id   (school_id)
#

class Laboratory < ApplicationRecord
  belongs_to :school, optional: true

  has_many :laboratory_users, dependent: :destroy
  has_many :users, through: :laboratory_users, source: :user

  has_one :laboratory_setting, dependent: :destroy

  has_many :portal_images, dependent: :destroy

  has_many :laboratory_shixuns, dependent: :destroy
  # has_many :shixuns, through: :laboratory_shixuns, source: :shixun

  has_many :laboratory_subjects, dependent: :destroy
  # has_many :subjects, through: :laboratory_subjects, source: :subject

  has_many :courses, dependent: :destroy
  has_many :competitions, dependent: :destroy
  has_many :libraries, dependent: :destroy

  validates :identifier, uniqueness: { case_sensitive: false }, allow_nil: true

  delegate :name, :navbar, :footer, :login_logo_url, :nav_logo_url, :tab_logo_url, :default_navbar, to: :laboratory_setting

  def site
    rails_env = EduSetting.get('rails_env')
    suffix = rails_env && rails_env != 'production' ? ".#{rails_env}.gitlink.org.cn" : '.gitlink.org.cn'

    identifier ? "#{identifier}#{suffix}" : ''
  end

  def self.find_by_subdomain(subdomain)
    return if subdomain.blank?

    rails_env = EduSetting.get('rails_env')
    subdomain = subdomain.slice(0, subdomain.size - rails_env.size - 1) if rails_env && subdomain.end_with?(rails_env) # winse.dev => winse

    find_by_identifier(subdomain)
  end

  # def self.current=(laboratory)
  #   Thread.current[:current_laboratory] = laboratory
  # end
  #
  # def self.current
  #   Thread.current[:current_laboratory] ||= Laboratory.find(1)
  # end

  def self.current=(user)
    RequestStore.store[:current_laboratory] = user
  end

  def self.current
    RequestStore.store[:current_laboratory] ||= User.anonymous
  end

  # 是否为主站
  def main_site?
    id == 1
  end
end
