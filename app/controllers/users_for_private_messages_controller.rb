class UsersForPrivateMessagesController < ApplicationController
  before_action :require_login, :check_auth

  def index
    users = User.active.where.not(id: current_user.id)
    users = users.where(laboratory_id: current_laboratory.id) unless current_laboratory.main_site?

    keyword = params[:keyword].to_s.strip
    if keyword.blank?
      @users = []
      return
    end

    users = users.like(keyword)

    @users = users.limit(10).includes(:user_extension)
  end
end