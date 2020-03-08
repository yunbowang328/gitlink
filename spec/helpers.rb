module Helpers
  def help
    :available
  end

  def debug
    true
  end


  %w(get post patch put head delete cookies assigns follow_redirect!).each do |method|
    define_method("ec#{method}") do |url,params={}|
      __ec(method, url, params)
    end
  end

  def __ec(method, url,params={})
    headers = {
        "ACCEPT" => "application/json",     # This is what Rails 4 accepts
        "HTTP_ACCEPT" => "application/json" # This is what Rails 3 accepts
    }
    __send__(method, url+".json", params: params, headers: headers)

    if debug
      puts response.body
    end

    expect(response.content_type).to eq("application/json")
  end
end
