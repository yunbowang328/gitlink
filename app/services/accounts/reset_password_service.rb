module Accounts
  class ResetPasswordService < ApplicationService
    # login、code、password、password_confirmation
    def initialize(user, params)
      @user      = user
      @password  = params[:password]
      @password_confirmation = params[:password_confirmation]
    end

    def call
      return if @user.blank?
      password  = strip(@password)
      password_confirmation = strip(@password_confirmation)

      Rails.logger.info "Accounts::ResetPasswordService params:   
        ##### password: #{@password} password_confirmation: #{@password_confirmation}"
        
      @user.password, @user.password_confirmation = password, password_confirmation

      sync_params = {
        password: password,
        email: @user.mail
      }
      interactor = Gitea::User::UpdateInteractor.call(@user.login, sync_params)
      raise ActiveRecord::Rollback unless interactor.success?
      
      @user
    end
  end
end
