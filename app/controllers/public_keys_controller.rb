class PublicKeysController < ApplicationController
  before_action :require_login
  before_action :find_public_key, only: [:destroy]

  def index 
    @public_keys = current_user.public_keys 
    @public_keys = kaminari_paginate(@public_keys)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def create 
    return render_error("参数错误") if public_key_params.blank?
    return render_ok({status: 10002, message: "请输入密钥"}) if public_key_params[:key].blank?
    return render_ok({status: 10001, message: "请输入标题"}) if public_key_params[:title].blank?
    @gitea_response = Gitea::User::Keys::CreateService.call(current_user.gitea_token, public_key_params)
    if @gitea_response[0] == 201 
      @public_key = @gitea_response[2]
    else 
      return render_error("创建ssh key失败") if @gitea_response[2]["message"].nil?
      return render_ok({status: 10002, message: "密钥格式不正确"}) if @gitea_response[2]["message"].starts_with?("Invalid key content")
      exist_public_key = Gitea::PublicKey.find_by(content: public_key_params[:key])
      return render_ok({status: 10002, message: "密钥已存在，请勿重复添加"}) if @gitea_response[2]["message"].starts_with?("Key content has been used as non-deploy key") && exist_public_key.owner_id == current_user.gitea_uid
      return render_ok({status: 10002, message: "密钥已被占用"}) if @gitea_response[2]["message"].starts_with?("Key content has been used as non-deploy key") && exist_public_key.present?
      @public_key = nil
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    return render_not_found unless @public_key.present?
    if @public_key.destroy
      render_ok 
    else 
      render_error
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 

  def page
    params[:page].to_i.zero? ? 1 : params[:page].to_i
  end

  def limit 
    limit = params[:limit] || params[:per_page]
		limit = (limit.to_i.zero? || limit.to_i > 15) ? 15 : limit.to_i
  end

  def public_key_params 
    params.require(:public_key).permit(:key, :title)
  end

  def find_public_key
    @public_key = current_user.public_keys.find_by_id(params[:id])
  end
end