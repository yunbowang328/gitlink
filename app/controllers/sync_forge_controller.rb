class SyncForgeController < ApplicationController
  skip_before_action :user_setup
  skip_before_action :check_sign

  def create
    SyncForgeJob.perform_later(params[:sync_params])
  end

end