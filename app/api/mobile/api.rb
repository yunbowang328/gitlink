#coding=utf-8
# status值
# 0：成功；-1：500错误；403：无权限；404：页面不存在

module Mobile
  require_relative 'middleware/error_handler'
  require_relative 'apis/auth'
  require_relative 'apis/memos'
  require_relative 'apis/forum_sections'
  require_relative 'apis/my_memos'
  # require_relative 'apis/my_forums'

  class API < Grape::API
    version 'v1', using: :path
    format :json
    content_type :json, "application/json;charset=UTF-8"
    # use ActionDispatch::Session::CookieStore
    use Middleware::ErrorHandler

    helpers do
      def logger
        API.logger
      end

      def authenticate!
        begin
          # current_user = User.find(2) if current_user.blank?
          if params[:debug] == 'admin'
            logger.info("Login as admin user, for test only")
            User.current = User.find 1
          elsif params[:debug] == 'normal'
            logger.info("Login as normal user, for test only")
            User.current = User.where(admin:false).first
          end
        rescue Exception => e
          return {:status => -2, :message => 'Unauthorized. 用户认证失败.'}
        end

      end

      # def manager_of_game
      #   myshixun_id = Game.where(:identifier => params[:identifier]).pluck(:myshixun_id).first
      #   myshixun = Myshixun.find(myshixun_id)
      #   unless (current_user.admin? || myshixun.user_id == current_user.id)
      #     return {}
      #   end
      # end
      #
      def session
        env['rack.session']
      end

      def current_user
        openid = session[:wechat_openid]
        if openid
          uw = UserWechat.find_by_openid(openid)
          return uw.user if uw
        end

        token = ApiKey.where(access_token: params[:token]).first
        if token && !token.expired?
          return User.find(token.user_id)
        end

        # 本地调试找不到用户信息
        if Rails.env.development? && session[:user_id].blank?
          # session[:user_id] = 12 #116
        end

        if session[:user_id].blank? || params[:debug].present?
          if params[:debug] == 'admin'
            Rails.logger.info("######________session_user_id________#############{session[:user_id]}")
            logger.info("Login as admin user, for test only")
            User.current = User.find 1
            session[:user_id] = 1
          elsif params[:debug] == 'normal'
            logger.info("Login as normal user, for test only")
            User.current = User.find 49
            session[:user_id] = 49
          else
            session[:user_id] = 2
          end
        end

        Rails.logger.info("####### session user_id is #{session[:user_id]}")
        if session[:user_id]
          user = (User.find(session[:user_id]) rescue nil)
          return user if user
        end
        nil
      end

      def current_user_ip
        env['REMOTE_ADDR']
      end
    end

    mount Apis::Auth
    mount Apis::Memos
    mount Apis::ForumSections
    mount Apis::MyMemos
    # add_swagger_documentation ({api_version: 'v1', base_path: '/api'})  if Rails.env.development?

  end
end


