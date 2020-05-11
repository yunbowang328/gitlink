class ProjectCreateChainJob < ApplicationJob
  queue_as :default

  def perform(owner_login, reponame)
    status = 0
    
    5.times do |i|
      if status == 200
        Rails.logger.info("########_repository__#{reponame}______create_chain_success__try:_#{i+1}_")
        break
      else 
        Rails.logger.info("########_repository__#{reponame}______start_to_create_chain__try:_#{i+1}_")
        create_chain = system("chain trustieCreate #{owner_login} #{reponame}")
        status = create_chain[:status].to_i
        Rails.logger.info("########_repository__#{reponame}__create_chain:___#{create_chain}____failed_to_create_chain__")
      end
    end
  end
end