#coding=utf-8

module Mobile

  module Entities 
    class Auth < Grape::Entity
      expose :token
      expose :user, using: User
    end
  end

  module Apis
    class Auth < Grape::API
      resource :auth do
        desc "用户登录"
        params do
          requires :login, type: String, desc: 'Username or email'
          requires :password, type: String, desc: 'Password'
        end
        post do
          user,last_logon = ::User.try_to_login(params[:login], params[:password])
          if user
            ::ApiKey.delete_all(user_id: user.id)
            key = ::ApiKey.create!(user_id: user.id)
            api_user = ::UsersService.new.show_user({id:user.id})
            present :data, {token: key.access_token, user: api_user}, using: Entities::Auth
            present :status, 0
          else
            present :message, "无效的用户名或密码"
            present :status,1
          end
        end

        desc "用户登出"
        params do
          requires :token, type: String
        end
        delete do
          authenticate!
          ::ApiKey.delete_all(user_id: current_user.id)
          {status: 0}
        end

        desc "忘记密码"
        params do
          requires :mail,type: String
        end
        post 'lost_password' do
          us = UsersService.new
          message = us.lost_password params
          present :message, message
          present :status, 0
        end

      end
    end
  end
end


