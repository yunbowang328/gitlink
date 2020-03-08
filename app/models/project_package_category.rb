class ProjectPackageCategory < ApplicationRecord
  default_scope { order(position: :asc) }

  has_many :project_packages, dependent: :destroy

  after_commit :reset_cache_data

  def self.cached_data
    Rails.cache.fetch(data_cache_key, expires_in: 1.days) do
      ProjectPackageCategory.select(:id, :name).as_json
    end
  end

  def self.data_cache_key
    'project_package_category/cached_data'
  end

  private

  def reset_cache_data
    Rails.cache.delete(self.class.data_cache_key)
  end
end