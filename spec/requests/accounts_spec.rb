require "rails_helper"


RSpec.describe "帐户", type: :request do


  it "成功登录" do
    ecpost login_accounts_url, {login: 'guange', password: '123456'}
    expect(JSON.parse(response.body)["login"]).to eq('guange')
  end

  it "登录失败" do
    ecpost login_accounts_url, {login: 'guange', password: 'wrong password'}
    expect(JSON.parse(response.body)["status"]).to eq(-1)
  end


end