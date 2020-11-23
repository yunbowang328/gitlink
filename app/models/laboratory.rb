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
    suffix = rails_env && rails_env != 'production' ? ".#{rails_env}.trustie.net" : '.trustie.net'

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

  def shixuns
    if main_site?
      not_shixun_ids = Shixun.joins(:laboratory_shixuns).where("laboratory_shixuns.laboratory_id != #{Laboratory.current.id}")
      Shixun.where.not(id: not_shixun_ids.pluck(:shixun_id))
    elsif sync_shixun
      laboratory_shixun_ids = laboratory_shixuns.pluck(:shixun_id)
      school_shixun_ids = Shixun.joins("join user_extensions on shixuns.user_id=user_extensions.user_id").where(user_extensions: { school_id: school_id }).pluck(:id)
      shixun_ids = laboratory_shixun_ids + school_shixun_ids
      Shixun.where(id: shixun_ids.uniq)
    else
      Shixun.joins(:laboratory_shixuns).where(laboratory_shixuns: { laboratory_id: id })
    end
  end

  def subjects
    if main_site?
      not_subject_ids = Subject.joins(:laboratory_subjects).where("laboratory_subjects.laboratory_id != #{Laboratory.current.id}")
      Subject.where.not(id: not_subject_ids.pluck(:subject_id))
    elsif sync_subject
      laboratory_subject_ids = laboratory_subjects.pluck(:subject_id)
      school_subject_ids = Subject.joins("join user_extensions on subjects.user_id=user_extensions.user_id").where(user_extensions: { school_id: school_id }).pluck(:id)
      subject_ids = laboratory_subject_ids + school_subject_ids
      Subject.where(id: subject_ids.uniq)
    else
      Subject.joins(:laboratory_subjects).where(laboratory_subjects: { laboratory_id: id })
    end
  end

  def all_courses
    main_site? || !sync_course ? courses : courses.or(Course.where(school_id: school_id))
  end

  def shixun_repertoires
    where_sql = ShixunTagRepertoire.where("shixun_tag_repertoires.tag_repertoire_id = tag_repertoires.id")

    # 云上实验室过滤
    unless main_site?
      where_sql = where_sql.joins("JOIN laboratory_shixuns ls ON ls.shixun_id = shixun_tag_repertoires.shixun_id "\
 																	"AND ls.laboratory_id = #{id}")
    end
    where_sql = where_sql.select('1').to_sql
    tags = TagRepertoire.where("EXISTS(#{where_sql})").distinct.includes(sub_repertoire: :repertoire)

    tags_map = tags.group_by(&:sub_repertoire)
    sub_reps_map = tags_map.keys.group_by(&:repertoire)

    sub_reps_map.keys.sort_by(&:updated_at).reverse.map do |repertoire|
      repertoire_hash = repertoire.as_json(only: %i[id name])
      repertoire_hash[:sub_repertoires] =
        sub_reps_map[repertoire].sort_by(&:updated_at).reverse.map do |sub_repertoire|
          sub_repertoire_hash = sub_repertoire.as_json(only: %i[id name])
          sub_repertoire_hash[:tags] = tags_map[sub_repertoire].sort_by(&:updated_at).reverse.map { |tag| tag.as_json(only: %i[id name]) }
          sub_repertoire_hash
        end
      repertoire_hash
    end
  end

  def subject_repertoires
    exist_sql = Subject.where('subjects.repertoire_id = repertoires.id')

    unless main_site?
      exist_sql = exist_sql.joins(:laboratory_subjects).where(laboratory_subjects: { laboratory_id: id })
    end

    Repertoire.where("EXISTS(#{exist_sql.select('1').to_sql})").order(updated_at: :desc).distinct
  end

  # 是否为主站
  def main_site?
    id == 1
  end
end
