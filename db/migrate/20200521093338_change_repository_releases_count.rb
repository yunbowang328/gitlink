class ChangeRepositoryReleasesCount < ActiveRecord::Migration[5.2]
  def change
    release_ids = VersionRelease.select(:id,:repository_id).pluck(:repository_id).uniq 
    release_ids.each do |i|
      puts "#######____update_repository_releases_id____##############{i}"
      p = Repository.includes(:version_releases).select(:id, :version_releases_count).find_by(id:i) 
      if p.present?
        Repository.reset_counters(i, :version_releases)
      end
    end
  end
end
