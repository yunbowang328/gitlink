class Gitea::Chain::ChainGetService < Gitea::ChainService

  attr_reader :params

  def initialize(params)
    @params = params 
  end

  def call
    get(url, request_params)
  end

  private

  def request_params
    Hash.new.merge(data: params["chain_params"])
  end

  def url
    chain_type = params["type"].to_s
    case chain_type
    when "query"
      "/repos/amount/query".freeze
    else 
      "".freeze
    end
  end

end