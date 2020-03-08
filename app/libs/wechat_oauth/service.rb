module WechatOauth::Service
  module_function

  def request(method, url, params)
    WechatOauth.logger.info("[WechatOauth] [#{method.to_s.upcase}] #{url} || #{params}")

    client = Faraday.new(url: WechatOauth.base_url)
    response = client.public_send(method, url, params)
    result = JSON.parse(response.body)

    WechatOauth.logger.info("[WechatOauth] [#{response.status}] #{result}")

    if result['errcode'].present? && result['errcode'].to_s != '0'
      raise WechatOauth::Error.new(result['errcode'], result['errmsg'])
    end

    result
  end

  # https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
  # response:
  # {
  #   "access_token":"ACCESS_TOKEN",
  #   "expires_in":7200,
  #   "refresh_token":"REFRESH_TOKEN",
  #   "openid":"OPENID",
  #   "scope":"SCOPE",
  #   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
  # }
  def access_token(code)
    params = {
      appid: WechatOauth.appid,
      secret: WechatOauth.secret,
      code: code,
      grant_type: 'authorization_code'
    }

    request(:get, '/sns/oauth2/access_token', params)
  end

  # https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Authorized_Interface_Calling_UnionID.html
  # response:
  # {
  #   "openid":"OPENID",
  #   "nickname":"NICKNAME",
  #   "sex":1,
  #   "province":"PROVINCE",
  #   "city":"CITY",
  #   "country":"COUNTRY",
  #   "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
  #   "privilege":[
  #     "PRIVILEGE1",
  #     "PRIVILEGE2"
  #   ],
  #   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
  #
  # }
  def user_info(access_token, openid)
    request(:get, '/sns/userinfo', access_token: access_token, openid: openid)
  end
end