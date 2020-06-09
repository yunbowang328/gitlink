class Gitea::Chain::ChainPostService < Gitea::ChainService

  attr_reader :params

  def initialize(params)
    @params = params 
  end

  def call
    post(url, request_params)
  end

  private

  def request_params
    Hash.new.merge(data: params[:chain_params])
  end

  def url
    chain_type = params[:type].to_s
    case chain_type
    when "create"
      "/repos/create".freeze
    when "upload"
      "/repos/commit/upload".freeze
    else  #由于目前的api文档操作post请求，除了create/upload，都是在/repos/amount/*，所以以下简化了
      "/repos/amount/#{chain_type}".freeze
    end
  end

end