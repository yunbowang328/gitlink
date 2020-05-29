class JournalsController < ApplicationController
  before_action :require_login, except: :index
  before_action :set_issue
  before_action :check_issue_permission
  before_action :set_journal, only: [:destroy, :edit, :update]

  def index
    @page  = params[:page]  || 1
    @limit = params[:limit] || 10
    total_journals =  @issue.journals.journal_includes
    @jounals_total = total_journals.size
    parent_journals =journals.parent_journals.order("created_on desc")
    @journals = parent_journals.order("created_on desc").page(@page).per(@limit)
    @journals_size = parent_journals.size
    
   
  end

  def create
    notes = params[:content]
    if notes.blank?
      normal_status(-1, "评论内容不能为空")
    else
      journal_params = {
        journalized_id: @issue.id ,
        journalized_type: "Issue",
        user_id: current_user.id ,
        notes: notes.to_s.strip,
        parent_id: params[:parent_id]
      }
      journal = Journal.new journal_params
      if journal.save
        if params[:attachment_ids].present?
          params[:attachment_ids].each do |id|
            attachment = Attachment.select(:id, :container_id, :container_type)&.find_by_id(id)
            unless attachment.blank?
              attachment.container = journal
              attachment.author_id = current_user.id
              attachment.description = ""
              attachment.save
            end
          end
        end

        # @issue.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "journal")

        normal_status(0, "评论成功")
      else
        normal_status(-1, "评论失败")
      end
    end
  end

  def destroy
    if @journal.destroy  #如果有子评论，子评论删除吗？
      normal_status(0, "评论删除成功")
    else
      normal_status(-1, "评论删除失败")
    end
  end

  def edit

  end

  def update
    content = params[:content]
    if content.present?
      if @journal.update_attribute(:notes, content)
        normal_status(0, "更新成功")
      else
        normal_status(-1, "更新失败")
      end
    else
      normal_status(-1, "评论的内容不能为空")
    end

  end

  def get_children_journals
    @page  = params[:page]  || 1
    @limit = params[:limit] || 10
    journals = Journal.children_journals(params[:id]).journal_includes.order("created_on desc")
    @journals_size = journals.size
    @children_journals = journals.page(@page).per(@limit)
  end


  private

  def set_issue
    @issue = Issue.find_by_id(params[:issue_id])
    unless @issue.present?
      normal_status(-1, "标签不存在")
    end
  end

  def check_issue_permission
    @project = @issue.project
    unless !@issue.is_lock || @project.member?(current_user) || current_user.admin?
      normal_status(-1, "您没有权限")
    end
  end

  def set_journal
    @journal = Journal.find(params[:id])
    unless @journal.present?
      normal_status(-1, "评论不存在")
    end
  end
end