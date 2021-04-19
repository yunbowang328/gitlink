# == Schema Information
#
# Table name: schools
#
#  id                 :integer          not null, primary key
#  name               :string(255)
#  province           :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  logo_link          :string(255)
#  pinyin             :string(255)
#  school_type        :integer          default("0")
#  city               :string(255)
#  address            :string(255)
#  auto_users_trial   :boolean          default("0")
#  shool_code         :string(255)
#  authorization_time :datetime
#  ec_auth            :integer          default("0")
#  identifier         :string(255)
#  is_online          :boolean          default("0")
#  video_name         :string(255)
#  video_desc         :string(255)
#  course_link        :string(255)
#  course_name        :string(255)
#  partner_id         :integer
#  customer_id        :integer
#  school_property_id :integer
#
# Indexes
#
#  index_schools_on_customer_id         (customer_id)
#  index_schools_on_identifier          (identifier)
#  index_schools_on_partner_id          (partner_id)
#  index_schools_on_school_property_id  (school_property_id)
#

class School < ApplicationRecord
  has_many :departments, dependent: :destroy

  # has_many :shixun_schools, :dependent => :destroy
  # has_many :shixuns, :through => :shixun_schools
  #
  # has_many :ec_school_users, :dependent => :destroy
  # has_many :users, :through => :ec_school_users
  #
  # has_many :ec_major_schools, :dependent => :destroy
  # has_many :ec_majors, :through => :ec_major_schools
  #
  # has_many :school_daily_reports, dependent: :destroy
  # has_many :courses

  has_many :customers, dependent: :destroy
  # has_one :partner, dependent: :destroy
  #
  # has_many :apply_add_departments, dependent: :destroy
  has_many :user_extensions, dependent: :nullify

  after_create do
    SyncTrustieJob.perform_later("school", 1) if allow_sync_to_trustie? #同步到trustie
  end

  # # 学校管理员
  # def manager?(user)
  #   ec_school_users.exists?(user_id: user.id)
  # end
  #
  # # 专业管理员
  # def major_manager?(user)
  #   relations = ec_major_schools.not_template.joins(:ec_major_school_users)
  #   relations.exists?(ec_major_school_users: { user_id: user.id })
  # end
  #
  # # 课程管理员
  # def course_manager?(user)
  #   relations = ec_major_schools.not_template.joins(ec_years: :ec_course_users)
  #   relations.exists?(ec_course_users: { user_id: user.id })
  # end

  def manage_permission?(user)
    manager?(user) || major_manager?(user) || course_manager?(user)
  end
end
