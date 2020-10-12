# encoding=utf-8
module Mobile
  module Apis
    class Memos < Grape::API
      before {authenticate!}
      content_type :json, 'application/json;charset=UTF-8'

      resources :memos do

        desc "帖子详情推荐"
        params do
          requires :id, type: Integer, desc: "帖子详情推荐"
        end
        get ':id/related_memos' do
          MemosService.new.related_memos params
        end

        desc "新建帖子"
        get 'new' do
          MemosService.new.new params, current_user, session
        end

        desc "新建保存帖子"
        params do
          requires :memo, type: Hash do
            requires :subject, type: String, desc: "帖子名"
            requires :content, type: String, desc: "帖子内容"
          end
          requires :forum_id, type: Integer, desc: "帖子类型"
        end
        post 'create' do
          MemosService.new.create params, current_user
        end

        desc "帖子详情"
        params do
          requires :id, type: Integer, desc: "帖子ID"
        end
        get ':id' do
          MemosService.new.show params, current_user
        end

        desc "收藏帖子"
        params do
          requires :id, type: Integer, desc: "帖子ID"
          requires :is_watch, type: Integer, desc:"顶置: 1 关注,0 取消关注 "
        end
        route_param :id do
          post 'watch_memo' do
            MemosService.new.watch_memo params, current_user
          end
        end

        desc "讨论区列表"
        get do
          MemosService.new.index params, current_user
        end

        desc "编辑帖子"
        params do
          requires :id, type: Integer, desc: "编辑帖子的ID"
        end
        route_param :id do
          get 'edit' do
            MemosService.new.edit params, current_user
          end
        end

        desc "更新帖子"
        params do
          requires :id, type: Integer, desc: "帖子ID"
        end
        route_param :id do
          post 'update' do
            MemosService.new.update params, current_user
          end
        end

        # TODO 本来可以跟实训评论一起用，但说不要动实训，所以另起一个方法
        desc "隐藏帖子"
        params do
          requires :id, type: Integer, desc: "帖子ID"
        end
        route_param :id do
          get :hidden do
            Memo.find(params[:id]).update_attribute(:hidden, true)
            {status: 0, message: "隐藏成功"}
          end
        end

        desc "帖子设置审核通过/不通过"
        params do
          requires :id, type: Integer, desc: "帖子ID"
        end
        route_param :id do
          post :memo_hidden do
            MemosService.new.memo_hidden params, current_user
          end
        end

        desc "回复帖子"
        params do
          requires :parent_id, type: Integer, desc: "给那个帖子的回复id"
          requires :content, type: String, desc: "回复内容"
        end
        route_param :root_id do
          post :reply do
            MemosService.new.reply params, current_user
          end
        end

        desc "隐藏回复帖子"
        params do
          requires :id, type: Integer, desc: "要隐藏的对象id。如：memo.id"
          requires :hidden, type: String
        end
        route_param :id do
          post 'hidden' do
            MemosService.new.hidden(params, current_user)
            return {:status => 1, :message => "success"}
          end
        end

        desc "删除帖子/评论"
        params do
          requires :id, type: Integer, desc: "帖子ID"
        end
        route_param :id do
          post "destroy" do
            MemosService.new.destroy params, current_user
          end
        end
        # delete ":id" do
        #   Memo.find(params[:id]).destroy
        # end

        desc "设置贴子顶置/取消顶置"
        params do
          requires :id, type: Integer, desc: "帖子ID"
          requires :sticky, type: Integer, desc:"顶置: 1 置顶,0 取消置顶 "
        end
        route_param :id do
          get "set-top-or-down" do
            MemosService.new.set_top_or_down params, current_user
          end
        end

        desc "设置贴子加精/取消加精推荐"
        params do
          requires :id, type: Integer, desc: "帖子ID"
          requires :is_fine, type: Integer, desc:"加精: 1 加精,0 取消加精 "
        end
        route_param :id do
          post "is_fine" do
            MemosService.new.is_fine params, current_user
          end
        end

        desc "用户禁言或取消禁言"
        params do
          requires :id, type: Integer, desc: "帖子ID"
          requires :user_id, type: Integer, desc:"被禁言用户的id"
          requires :banned, type: Integer, desc:"顶置: 1 禁言,0 取消禁言 "
        end
        route_param :id do
          post "banned_user" do
            MemosService.new.banned_user params, current_user
          end
        end

        desc "帖子回复更多"
        params do
          requires :id, type: Integer, desc: "帖子ID"
          requires :page, type: String, desc: "初次（第一页）为0"
        end
        route_param :id do
          get "more_reply" do
            MemosService.new.more_reply params, current_user
          end
        end

        desc "版块的全部帖子"

        params do
          requires :id, type: Integer, desc: "版块的ID"
          requires :page, type: String, desc: "初次（第一页）为0"
          # requires :forum_type, type: String, desc: "列表页的分类选择"
        end
        get "forum_memos/:id" do
          MemosService.new.forum_memos params, current_user
        end

        desc "版块的头部信息"

        params do
          requires :id, type: Integer, desc: "版块的ID"
        end
        get "forum_memos_head/:id" do
          MemosService.new.forum_memos_head params, current_user
        end

        desc "版块的右侧信息"

        params do
          requires :id, type: Integer, desc: "版块的ID"
        end
        get "forum_memos_right/:id" do
          MemosService.new.forum_memos_right params, current_user
        end
        # route_param :id do
        #
        # end
        desc "版块的关注"
        params do
          requires :id, type: Integer, desc: "版块的ID"
          requires :is_watch, type: Integer, desc:"顶置: 1 关注,0 取消关注 "
        end
        post "forum_memos/:id/is_watch" do
          MemosService.new.is_watch params, current_user
        end

        desc "申请删除帖子"
        params do
          requires :id, type: Integer, desc: "帖子的id"
        end
        post ":id/confirm_delete" do
          MemosService.new.confirm_delete params, current_user
        end


        # desc "版块的首页"
        # params do
        #   requires :page, type: String, desc: "初次（第一页）为0"
        # end
        # get "index" do
        #   MemosService.new.index params, current_user
        # end
      end
    end
  end
end