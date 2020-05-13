class Gitea::Repository::Hooks::QueryService < Gitea::ClientService
  #查询用户的积分/贡献 
  #query_params = {
    #type: "user", #"user/members/percent"
    #ownername: ownername,
    #reponame: reponame,
    #username: username
  #}
  attr_reader :query_params

  def initialize(query_params)
    @query_params = query_params 
  end

  def call
    query_type = query_params[:type] || "user"
    if query_type == "user"   #查询单个用户的积分
      query_result = `chain query #{query_params[:ownername]} #{query_params[:reponame]} #{query_params[:username]}`

      #response {status:int, message:string, value:int}
    elsif query_type == "members"  #查询项目全部用户的积分
      query_result = `chain getAllInfo #{query_params[:ownername]} #{query_params[:reponame]}`
      #response {status:int, message:string, value:jsonObject}
    else  #查询用户在项目的贡献大小
      query_result = `chain getContributionPercent #{query_params[:ownername]} #{query_params[:reponame]} #{query_params[:username]}`

      #response {status:int, message:string, percent:int, allTokenSum:int, personalTokens:int}
    end 
    eval(query_result)
  end

end