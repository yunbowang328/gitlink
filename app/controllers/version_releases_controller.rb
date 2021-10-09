class VersionReleasesController < ApplicationController
  before_action :load_repository
  before_action :set_user
  before_action :require_login, except: [:index, :show]
  before_action :check_release_authorize, except: [:index, :show]
  before_action :find_version , only: [:show, :edit, :update, :destroy]

  def index
    @version_releases = kaminari_paginate(@repository.version_releases.order(created_at: :desc))
    @user_permission = current_user.present? && (@repository.project.all_developers.include?(current_user) || current_user.admin?)
    @user_admin_permission = current_user.present? && (@repository.project.all_managers.include?(current_user) || current_user.admin?)
  end

  def new
    #获取所有的分支
    @all_branches = []
    get_all_branches = Gitea::Repository::Branches::ListService.new(@user, @repository.try(:identifier)).call
    if get_all_branches && get_all_branches.size > 0
      get_all_branches.each do |b|
        @all_branches.push(b["name"])
      end
    end
  end

  def show 
    # @release = Gitea::Versions::GetService.call(current_user.gitea_token, @user&.login, @repository&.identifier, @version&.version_gid)
  end

  def create
    if params[:name].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:tag_name].blank?
      normal_status(-1, "标签名称不能为空")
    elsif VersionRelease.exists?(tag_name: params[:tag_name], repository_id: @repository.id)
      normal_status(-1, "该版本已存在")
    elsif VersionRelease.exists?(name: params[:name], repository_id: @repository.id)
      normal_status(-1, "该版本已存在")
    else
      ActiveRecord::Base.transaction do
        begin
          version_params = releases_params
          version_release = VersionRelease.new(version_params.merge(user_id: current_user.id, repository_id: @repository.id))
          if version_release.save!
            git_version_release = Gitea::Versions::CreateService.new(current_user.gitea_token, @user.try(:login), @repository.try(:identifier), version_params).call
            if git_version_release
              update_params = {
                tarball_url: git_version_release["tarball_url"],
                zipball_url: git_version_release["zipball_url"],
                url: git_version_release["url"],
                version_gid: git_version_release["id"],
                sha: git_version_release["sha"]
              }
              version_release.update_attributes!(update_params)
              version_release.project_trends.create(user_id: current_user.id, project_id: @project.id, action_type: "create")
              if params[:attachment_ids].present?
                create_attachments(params[:attachment_ids], version_release)
              end
              normal_status(0, "发布成功")
            else
              normal_status(-1, "发布失败")
            end
          else
            normal_status(-1, "发布失败")
          end
        rescue => e
          puts "create version release error: #{e.message}"
          raise Error, e.message
        end
      end
    end
  end

  def edit
    @version_attachments = @version.attachments
  end

  def update
    if params[:name].nil?
      normal_status(-1, "名称不能为空")
    elsif params[:tag_name].blank?
      normal_status(-1, "标签名称不能为空")
    else
      ActiveRecord::Base.transaction do
        begin
          version_params = releases_params

          if @version.update_attributes!(version_params)
            create_attachments(params[:attachment_ids], @version) if params[:attachment_ids].present?
            git_version_release = Gitea::Versions::UpdateService.new(current_user.gitea_token, @user.try(:login), @repository.try(:identifier), version_params, @version.try(:version_gid)).call
            unless git_version_release
              raise Error, "更新失败"
            end

            normal_status(0, "更新成功")
          else
            normal_status(-1, "更新失败")
          end
        rescue => e
          puts "update version release error: #{e.message}"
          raise Error, e.message
        end
      end
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      begin
        if @version.destroy
          git_version_release = Gitea::Versions::DeleteService.new(current_user.gitea_token, @user.try(:login), @repository.try(:identifier), @version.try(:version_gid)).call

          if git_version_release.status == 204
            normal_status(0, "删除成功")
          elsif git_version_release.status == 401
            normal_status(0, "发布版本不存在")
          else
            normal_status(-1, "删除失败")
          end
        else
          normal_status(-1, "删除失败")
        end
      rescue => e
        puts "destroy version release error: #{e.message}"
        raise Error, e.message
      end
    end
  end


  private
  def set_user
    @user = @repository.owner
  end

  def find_version
    @version = VersionRelease.find_by_id(params[:id])
    unless @version.present?
      normal_status(-1, "版本不存在")
    end
  end

  def releases_params
   {
      body:	params[:body],
      draft: params[:draft] || false,
      name: params[:name],
      prerelease: params[:prerelease] || false,
      tag_name: params[:tag_name],
      target_commitish: params[:target_commitish] || "master"  #分支
    }
  end

  def create_attachments(attachment_ids, target)
    attachment_ids.each do |id|
      attachment = Attachment.select(:id, :container_id, :container_type)&.find_by_id(id)
      unless attachment.blank?
        attachment.container = target
        attachment.author_id = current_user.id
        attachment.description = ""
        attachment.save
      end
    end
  end

  def check_release_authorize
    return render_forbidden("您没有权限进行此操作.") unless current_user.admin? || @project.manager?(current_user)
  end

end
