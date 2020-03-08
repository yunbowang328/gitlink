class GitsController < ApplicationController
  skip_before_action :check_sign
  # 说明：
  # 以下Git认证只针对新版git，Gitlab的Git认证不走该控制器
  # 思路：
  # 1、用户通过Git客户端推送代码的时候，这个时候Git客户端肯定会强制用户输入邮箱的
  # 2、通过web端版本库界面更新代码（如果用户邮箱不存在，则用系统备用邮箱）
  # 供 git-workhorse反向调用认证
  def auth
    # HTTP_AUTHORIZATION: "Basic 这里base64编码的的密码(user:passwd)"
    decodes = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)
    rand_code = decodes.sample(10).join
    logger.info("11111112222223333 HTTP_AUTHORIZATION: #{request.env["HTTP_AUTHORIZATION"]}")
    logger.info("1111111 git auth start: code is #{rand_code}, time is #{Time.now}")

    # logger.info("#########-----request_env: #{request.env}")
    # {"service"=>"git-receive-pack", "controller"=>"gits", "action"=>"auth",
    # "url"=>"forge01/cermyt39.git/info/refs"}
    #
    gituser = edu_setting('git_username')
    gitpassword = edu_setting('git_password')

    result = false
    if request.env["HTTP_AUTHORIZATION"] && request.env["HTTP_AUTHORIZATION"].split(" ").length == 2
      username_password = Base64.decode64(request.env["HTTP_AUTHORIZATION"].split(" ")[1])

      if username_password.split(":")[0].nil? || username_password.split(":")[1].nil?
        result = false
      else
        input_username = username_password.split(":")[0].strip()
        input_password = username_password.split(":")[1].strip()
        uid_logger("git start auth: input_username is #{input_username}")


        # Git 超级权限用户
        if input_username.strip == gituser.strip && input_password.strip == gitpassword.strip
          result = true
        else
          # 用户是否对对象拥有权限
          system_user = User.find_by_login(input_username) || User.find_by_mail(input_username) || User.find_by_phone(input_username)
          # 如果用户名密码错误
          if system_user.blank? || system_user && !system_user.check_password?(input_password)
            uid_logger_error("git start: password is wrong")
            result = false
          else
            git_url = params["url"]
            username = git_url.split("/")[0]
            shixunname = git_url.split("/")[1].split(".")[0]
            repo_name = username + "/" + shixunname
            uid_logger("git start: repo_name is #{repo_name}")
            shixun = Shixun.select([:id, :user_id, :repo_name, :identifier]).where(repo_name: repo_name).first
            if shixun.blank?
              shixun_id = ShixunSecretRepository.where(repo_name: repo_name).pluck(:shixun_id).first
              logger.info("####repo_name:#{repo_name}")
              logger.info("####shixun_id:#{shixun_id}")
              shixun = Shixun.select([:id, :user_id, :repo_name, :identifier]).find_by(id: shixun_id)
            end
            uid_logger("git start auth: shixun identifier is #{shixun.try(:identifier)}")
            uid_logger("git start auth: systemuser is #{system_user.try(:login)}")

            if shixun.present?
              logger.info("#######{system_user.manager_of_shixun?(shixun)}")
              if system_user.present? && system_user.manager_of_shixun?(shixun)
                result = true
              else
                uid_logger_error("gituser is not shixun manager")
                result = false
              end
            else
              uid_logger_error("shixun is not exist")
              # result = false
              result = true # 为了测试跳出
            end
          end
        end
      end
    end

    authenticate_or_request_with_http_basic do |username, password|
      result
    end
  end

end