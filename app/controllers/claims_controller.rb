#coding=utf-8
class ClaimsController < ApplicationController
    # skip_before_action :verify_authenticity_token
    protect_from_forgery with: :null_session
    before_action :require_login, except: [:index]
    before_action :set_issue

    def index
        @user_claimed = 0
        @claims = @issue.claims.claim_includes.order("created_at desc")
    
        @claims.each do |claim|
            if claim.user_id == current_user.id
                @user_claimed = 1
                break
            end
        end 
        render file: 'app/views/claims/list.json.jbuilder'
    end

    def create
        @claim = Claim.find_by_sql(["select id from claims where issue_id=? and user_id=?",params[:issue_id], current_user.id])
        if @claim.present?
            return normal_status(-1,"您已经声明过该易修")
        end

        ActiveRecord::Base.transaction do
            @claim = Claim.new(parse_issue_params(params))
            if @claim.save
                @claims = @issue.claims.claim_includes.order("created_at desc")
                @user_claimed = 1
                
                journal_params = {
                    journalized_id: params[:issue_id],
                    journalized_type: "Issue",
                    user_id: current_user.id ,
                    notes: "新建声明: #{params[:claim_note]}",
                }

                journal = Journal.new(journal_params)
                if journal.save
                    render file: 'app/views/claims/list.json.jbuilder'
                else
                    normal_status(-1,"新建声明关联评论操作失败")
                end

            else
                normal_status(-1,"新建声明操作失败")
            end
        end 
    end

    def update
        @claim =  Claim.find_by_id(params[:claim_id])
        if @claim.blank? 
            return normal_status(-1,"易修不存在")
        end

        if @claim.user_id != current_user.id
            return normal_status(-1,"你不能更新别人的声明")
        end

        ActiveRecord::Base.transaction do
            if @claim.update_attribute(:note,params[:claim_note])
                @claims = @issue.claims.claim_includes.order("created_at desc")
                @user_claimed = 1
               
                journal_params = {
                    journalized_id: params[:issue_id],
                    journalized_type: "Issue",
                    user_id: current_user.id ,
                    notes: "更新声明: #{params[:claim_note]}",
                }

                journal = Journal.new(journal_params)
                if journal.save
                    render file: 'app/views/claims/list.json.jbuilder'
                else
                    normal_status(-1,"新建声明关联评论操作失败")
                end

            else
                normal_status(-1,"声明更新操作失败")
            end
        end 
    end

    def destroy
        @claim = Claim.find_by_sql(["select id from claims where issue_id=? and user_id=?",params[:issue_id], current_user.id])
        if @claim.blank?
            normal_status(-1,"您未曾声明过该易修")
        else 
            @claim = @claim[0]
            # 判断current user是否是claimer
            ActiveRecord::Base.transaction do
                if @claim.destroy

                    @claims = @issue.claims.claim_includes.order("created_at desc")
                    @user_claimed = 0

                    journal_params = {
                        journalized_id: params[:issue_id],
                        journalized_type: "Issue",
                        user_id: current_user.id ,
                        notes: "取消声明",
                    }
    
                    journal = Journal.new(journal_params)
                    if journal.save
                        render file: 'app/views/claims/list.json.jbuilder'
                    else
                        normal_status(-1,"新建声明关联评论操作失败")
                    end

                else
                    normal_status(-1,"取消声明操作失败")
                end
            end 
        end 
    end

    private
    def parse_issue_params(params)
        {
            issue_id: params[:issue_id],
            user_id: current_user.id,
            note: params[:claim_note],
        }
    end

    def set_issue
        @issue = Issue.find_by_id(params[:issue_id])
        unless @issue.present?
          normal_status(-1, "易修不存在")
        end
      end

end