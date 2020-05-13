class ProjectCreateChainJob < ApplicationJob
  queue_as :default

  def perform(chain_params)
    status = false
    chain_type = chain_params[:type].to_s
    reponame = chain_params[:reponame]

    5.times do |i|
      if status
        Rails.logger.info("########_repository__#{reponame}______create_chain_success__try:_#{i+1}_")
        break
      else 
        Rails.logger.info("########_repository__#{reponame}______start_to_create_chain__try:_#{i+1}_")
        if chain_type == "create"
          status = create_chain(chain_params)
        elsif chain_type == "push"
          status = push_chain(chain_params)
        end
      end
    end

    unless status
      Rails.logger.info("########_repository__#{reponame}__create_chain:___#{status}____failed_to_create_chain__")
    end
  end

  private 

  #创建项目的上链操作
  def create_chain(chain_params)
    system("chain trustieCreate #{chain_params[:ownername]} #{chain_params[:reponame]}")
  end

  # push项目的上链操作
  def push_chain(chain_params) 
    system("chain trustiePush #{chain_params[:ownername]} #{chain_params[:reponame]} #{chain_params[:username]} #{chain_params[:uploadPushInfo]}")
  end
end