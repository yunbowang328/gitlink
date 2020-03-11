class SyncForgeController < ApplicationController

  def create
    SyncForgeJob.perform_later(params[:sync_params])
  end

end