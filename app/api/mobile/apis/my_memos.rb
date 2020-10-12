#coding=utf-8
module Mobile
  module Apis
    class MyMemos < Grape::API
      before {authenticate!}
      content_type :json, 'application/json;charset=UTF-8'

      resources :my_memos do
        desc "我的话题"
        get ":login/memos" do
          MyMemosService.new.index params, current_user
        end

        desc "我感兴趣的话题"
        get ":login/my_interested" do
          MyMemosService.new.my_interested params, current_user
        end

        desc "我的回帖"
        get ":login/replies_memos" do
          MyMemosService.new.replies_memos params,current_user
        end

        desc "右侧推荐"
        get "recommend_memos" do
          MyMemosService.new.recommend_memos current_user
        end

      end
    end
  end
end
