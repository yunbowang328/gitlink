module MembersHelper
  def get_user_token(user_login,reponame)
    query_params = {
      type: "query",
      chain_params: {
        reponame: reponame,
        username: user_login
      }
    }
    response = Gitea::Chain::ChainGetService.new(query_params).call

    if response.status == 200 
      return JSON.parse(response.body)["balance"].to_i
    else 
      return 0
    end
  end
end
