class PostChainJob < ApplicationJob
  queue_as :default

  #注 pull_request的 api文档有问题，字段未明确，所以暂时关于pr的参数应该有问题。6-8，hs
  def perform(chain_params)
    status = false
    chain_type = chain_params[:type].to_s
    reponame = chain_params[:chain_params][:reponame]
    5.times do |i|
      if status
        break
      else
        response = Gitea::Chain::ChainPostService(chain_params)
        if response.status == 200 
          reponse_body = response&.body 
          messages = reponse_body.present? ? JSON.parse(reponse_body) : "success"
          status = true
          Rails.logger.info("################_repository__#{reponame}______create_chain_success_try:_#{i+1}_message__:#{messages}__")
        else
          Rails.logger.info("########_repository__#{reponame}______create_chain_failed__try:_#{i+1}_")
        end
      end
    end
  end
end