class ProjectCreateChainJob < ApplicationJob
  queue_as :default

  #可以去掉

  # def perform(chain_params)
  #   status = false
  #   chain_type = chain_params[:type].to_s
  #   reponame = chain_params[:reponame]

  #   5.times do |i|
  #     if status
  #       Rails.logger.info("########_repository__#{reponame}______create_chain_success__try:_#{i+1}_")
  #       break
  #     else 
  #       Rails.logger.info("########_repository__#{reponame}______start_to_create_chain__try:_#{i+1}_")
  #       if chain_type == "create"
  #         chain_status = create_chain(chain_params)
  #       elsif chain_type == "push"
  #         chain_status = push_chain(chain_params)
  #       else 
  #         chain_status = {status: 200}
  #       end
  #       Rails.logger.info("########_response__chain_status__#{chain_status}__")

  #       status = chain_status[:status].to_i
  #     end
  #   end

  #   unless status == 200
  #     Rails.logger.info("########_repository__#{reponame}__create_chain:___#{chain_status}____failed_to_create_chain__")
  #   end
  # end

  # private 

  # #创建项目的上链操作
  # def create_chain(chain_params)
  #   result = `chain trustieCreate #{chain_params[:ownername]} #{chain_params[:reponame]}`
  #   return eval(result)
  # end

  # # push项目的上链操作
  # def push_chain(chain_params) 
  #   result = `chain trustiePush #{chain_params[:ownername]} #{chain_params[:reponame]} #{chain_params[:username]} #{chain_params[:uploadPushInfo]}`
  #   return eval(result)
  # end
end