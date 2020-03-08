class Wechats::JsSdkSignaturesController < ApplicationController
  def create
    timestamp = Time.now.to_i
    noncestr = ('A'..'z').to_a.sample(8).join
    signature = Wechat::OfficialAccount.js_sdk_signature(params[:url], noncestr, timestamp)

    render_ok(appid: Wechat::OfficialAccount.appid, timestamp: timestamp, noncestr: noncestr, signature: signature)
  rescue Wechat::Error => ex
    render_error(ex.message)
  end
end