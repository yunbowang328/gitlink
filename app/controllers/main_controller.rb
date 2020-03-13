class MainController < ApplicationController
  protect_from_forgery except: :index
  skip_before_action :check_sign
  skip_before_action :user_setup
  # skip_before_action :setup_laboratory

  def first_stamp
    render :json => { status: 0, message: Time.now.to_i }
  end

  def index
    domain_session = params[:_educoder_session]
    if domain_session
      uid_logger("main start  domain_session is #{domain_session}")
      if cookies[:_educoder_session] != domain_session
        cookies[:_educoder_session] = nil
        cookies[:_educoder_session] = domain_session
      end


      uid_logger("main start is #{cookies[:_educoder_session]}")
    end

    # TODO: 这块之后需要整合，者架构重新变化，统一跳转到index后再路由分发
    if params[:path] && params[:path]&.include?("h5educoderbuild") && params[:path].split("/").first == "h5educoderbuild"
      render file: 'public/h5educoderbuild/index.html', :layout => false
    else
      render file: 'public/react/build/index.html', :layout => false
    end

  end
end
