class ChangeTokenJob < ApplicationJob
  queue_as :default

  def perform(change_params)
    status = 0
    5.times do |i|
      if status == 200
        Rails.logger.info("########_change_user_toke_success_user:__#{change_params[:username]}_try:_#{i+1}_")
        break
      else 
        Rails.logger.info("########_change_user_toke_try:_#{i+1}_")
        chain_status = `chain #{change_params[:change_type]} #{change_params[:ownername]} #{change_params[:reponame]} #{change_params[:username]} #{change_params[:tokens].to_i}`
        chain_status = eval(chain_status)
        status = chain_status[:status].to_i
      end
    end
    unless status == 200 
      Rails.logger.info("########_change_user_toke_failed__change_params:__#{change_params}_")
    end
  end

end