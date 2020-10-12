#coding=utf-8
module Mobile
  module Apis
    class ForumSections < Grape::API
      before {authenticate!}
      content_type :json, 'application/json;charset=UTF-8'

      resources :forum_sections do

        desc "获取板块的筛选分类"
        get "select_sections" do
          ForumSectionsService.new.select_sections
        end

        desc "获取板块的全部分类"
        get  do
          ForumSectionsService.new.index params
        end

        desc "申请版主"
        params do
          requires :id, type: Integer, desc: "版块的id"
        end
        route_param :id do
          post "user_apply" do
            ForumSectionsService.new.user_apply params, current_user, current_user_ip
          end
        end

        desc "发布公告"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :content, type: String, desc: "公告的内容"
        end
        route_param :id do
          post "edit_notice" do
            ForumSectionsService.new.edit_notice params
          end
        end

        desc "版块的头部信息"
        params do
          requires :id, type: Integer, desc: "版块的id"
        end
        route_param :id do
          get "forum_section_header" do
            ForumSectionsService.new.forum_section_header params, current_user
          end
        end

        desc "新增二级版块"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :title, type: String, desc: "版块的名称"
        end
        route_param :id do
          post 'create' do
            ForumSectionsService.new.create params, current_user
          end
        end

        desc "重命名"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :children_section_id, type: Integer, desc: "二级版块的id"
          requires :title, type: String, desc: "版块的名称"
        end
        route_param :id do
          post "rename" do
            ForumSectionsService.new.rename params, current_user
          end
        end

        desc "删除二级版块"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :children_section_id, type: Integer, desc: "二级版块的id"
        end
        route_param :id do
          post "destroy" do
            ForumSectionsService.new.destroy params, current_user
          end
        end

        desc "排序"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :order_type, type: String, desc: "排序按desc，和asc排序"
        end
        route_param :id do
          get "order_forums" do
            ForumSectionsService.new.order_forums params, current_user
          end
        end

        desc "搜索用户"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :page, type: Integer, desc: "初次（第一页）为0"
          # requires :user_name, type: String, desc: "输入的关键字"
        end
        route_param :id do
          get "search_users" do
            ForumSectionsService.new.search_users params, current_user
          end
        end

        desc "二级版块添加管理员"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :user_ids, type: Array, desc: "输入的关键字"
          requires :children_section_id, type: Integer, desc: "二级版块的id"
        end
        route_param :id do
          post "add_users" do
            ForumSectionsService.new.add_users params, current_user
          end
        end


        desc "管理员页面的版块管理"
        params do
          requires :id, type: Integer, desc: "版块的id"
        end
        route_param :id do
          get "managements" do
            ForumSectionsService.new.managements params, current_user
          end
        end

        desc "管理员页面的申请接口"
        params do
          requires :id, type: Integer, desc: "版块的id"
        end
        route_param :id do
          get "applied_forums" do
            ForumSectionsService.new.applied_forums params, current_user
          end
        end

        desc "管理员页面的申请处理"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :apply_id, type: Integer, desc: "申请的id"
          requires :deal_type, type: Integer, desc: "处理的方式，1为同意，2为拒绝"
        end
        route_param :id do
          post "deal_applies/:apply_id" do
            ForumSectionsService.new.deal_applies params, current_user
          end
        end

        desc "管理员页面的删除二级版主"
        params do
          requires :id, type: Integer, desc: "版块的id"
          requires :moderator_id, type: Integer, desc: "版主的id"
        end
        route_param :id do
          post "destroy_moderator/:moderator_id" do
            ForumSectionsService.new.destroy_moderator params, current_user
          end
        end

        desc "待审核的帖子"
        params do
          requires :id, type: Integer, desc: "版块的待审核id"
          requires :page, type: String, desc: "初次（第一页）为0"
        end
        route_param :id do
          get "unchecked_memos" do
            ForumSectionsService.new.unchecked_memos params, current_user
          end
        end

        desc "待审查的回复"
        params do
          requires :id, type: Integer, desc: "版块的待审核id"
          requires :page, type: String, desc: "初次（第一页）为0"
        end
        route_param :id do
          get "unchecked_replies" do
            ForumSectionsService.new.unchecked_replies params, current_user
          end
        end

        desc "已发布的帖子"
        params do
          requires :id, type: Integer, desc: "版块的待审核id"
          requires :page, type: String, desc: "初次（第一页）为0"
        end
        route_param :id do
          get "checked_memos" do
            ForumSectionsService.new.checked_memos params, current_user
          end
        end
      end
    end
  end
end
