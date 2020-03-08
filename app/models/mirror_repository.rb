class MirrorRepository < ApplicationRecord
  has_many :shixun_mirror_repositories, :dependent => :destroy
  has_many :shixun, :through => :shixun_mirror_repositories
  has_many :mirror_scripts, :dependent => :destroy



  scope :published_mirror, -> { where(status: [1,2,3,5]) }
  scope :published_main_mirror, -> { published_mirror.where(main_type: 1) }
  scope :published_small_mirror, -> { published_mirror.where(main_type: 0) }
  scope :small_mirror, -> { where(main_type: 0) }

  def deletable?
    status != 1 && !shixun_mirror_repositories.exists?
  end
end
